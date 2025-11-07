export type Chat = {
  content: string;
  who: "AI" | "Me";
  loading?: boolean;
}