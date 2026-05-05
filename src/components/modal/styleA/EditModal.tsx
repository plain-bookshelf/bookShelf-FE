import * as S from "./styleA"
import { useUser } from "../../contexts/UserContext"
import modalArrow from "../../../assets/modalArrow.png"
import cropBox from "../../../assets/editImgOutline.png"
import { BaseModal } from "../baseModal";
import { lineWobble } from 'ldrs'
import { useState } from "react";
import Cropper from "react-easy-crop";
import { patchEditUserImg } from "../../../api/my";

export default function EditModal({ onClose }: { onClose: () => void }) {
  const { user, setUser } = useUser();
  const [nextStep, setNextStep] = useState(false);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(true);

  lineWobble.register();

  const Step1 = ({ onClose }: { onClose: () => void }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if(file){
        const imgURL = URL.createObjectURL(file);
        setPreview(imgURL);
        setNextStep(true);
      }
    }

    return(
      <>
        <BaseModal onClose={onClose}>
          <S.BoxA>
            <S.BoxContent>
              <S.BoxHeader>
                <img src={modalArrow} onClick={onClose} style={{cursor: "pointer"}} />
                <S.BoxHeaderTitle>프로필 사진 추가</S.BoxHeaderTitle>
              </S.BoxHeader>
              <S.ProfileOutlien>
                <img src={user.img} style={{width: "120px", borderRadius: "50%"}} />
              </S.ProfileOutlien>
            </S.BoxContent>
            <S.BoxLine />
            <S.BoxInput readOnly id="upload" type="file" accept="image/*" onChange={handleFileChange} style={{display: "none"}} />
            <S.Label htmlFor="upload">컴퓨터에서 불러오기</S.Label>
          </S.BoxA>
        </BaseModal>
      </>
    )
  }

  const Step2 = ({ onClose }: { onClose: () => void }) => {
    const [crop, setCrop] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number }>({ x: 0, y: 0, width: 120, height: 120});
    const cropSize = { width: 120, height: 120 };

    const getCroppedImg = async (imageSrc: string, area: { x: number; y: number; width: number; height: number }) => {
      const image = new Image();
      image.src = imageSrc;
      /*이미지 로드 다 될 때 까지 기다리기
      image.onload = resolve 요건 축약형으로 쓴 거*/
      await new Promise((resolve) => (image.onload = resolve));

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;

      const size = cropSize.width;
      canvas.width = size;
      canvas.height = size;

      const sx = area.x;
      const sy = area.y;
      const sWidth = area.width;
      const sHeight = area.height;

      ctx.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, size, size);

      return canvas.toDataURL("image/jpeg", 0.9);
    }
    
    const handleCropChange = (newCrop: any) => {
      setCrop(newCrop)
    }

    return(
      <BaseModal onClose={onClose}>
          <S.BoxA>
            <S.BoxContent>
              <S.BoxHeader>
                <img src={modalArrow} onClick={onClose} style={{cursor: "pointer"}} />
                <S.BoxHeaderTitle>프로필 사진 추가</S.BoxHeaderTitle>
              </S.BoxHeader>
              <S.ProfileBox>
                <img src={cropBox} style={{position: "absolute", pointerEvents: "none"}} />
                <S.CropWrapper>
                  <Cropper
                    image={preview}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    cropShape="round"
                    showGrid={false}
                    cropSize={cropSize}
                    /*아래 속성은 사진에 여백이 포함되지 않도록 꽉 채우는 건데.. 
                    이건 디자인이랑 상의해서 여백 포함 할 수 있게 할 건지 정해야 할듯*/
                    objectFit="cover"
                    onCropComplete={(_, croppedPixels) => setCroppedAreaPixels(croppedPixels)}
                    onCropChange={handleCropChange}
                    onZoomChange={setZoom}
                    onMediaLoaded={() => setLoading(false)}
                  />
                </S.CropWrapper>
              </S.ProfileBox>
            </S.BoxContent>
            {loading && <S.SpinnerBox>
              <l-line-wobble
                size="520"
                stroke="6"
                bg-opacity="0.1"
                speed="5" 
                color="#00C471"
              ></l-line-wobble>
            </S.SpinnerBox>}
            {!loading && <S.BoxLine />}
            <S.BoxInput type="button" value="확인" onClick={async () => {
              const croppedUrl = await getCroppedImg(preview, croppedAreaPixels);
              setUser({ ...user, img: croppedUrl });
              await patchEditUserImg(user.id, croppedUrl);
              onClose();
            }} />
          </S.BoxA>
      </BaseModal>
    )
  }

  return(
    <>
      {nextStep === false ? <Step1 onClose={onClose} /> : <Step2 onClose={onClose} />}
    </>
  )
}