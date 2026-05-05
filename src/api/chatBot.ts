export const postMessage = async (
  userName: string,
  content: string,
  onChunk?: (text: string) => void,
) => {
  const serverIp = import.meta.env.VITE_APP_AI_Server_IP;
  const response = await fetch(`${serverIp}/chatbot/Bookshelf_AI`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userName, user_said: content }),
  });

  if (!response.body) {
    return "서버 스트림 응답이 전달되지 않았습니다.";
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let fullText = "";

  while (true) {
    // 스트리밍 응답을 chunk 단위로 읽어서 하나의 문자열로 합친다.
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    fullText += chunk;

    // 화면에서 타이핑 효과가 필요할 때 chunk를 즉시 전달할 수 있게 콜백을 열어 둔다.
    if (onChunk) {
      onChunk(chunk);
    }
  }

  return fullText;
};
