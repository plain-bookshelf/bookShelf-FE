import * as S from "./styleA"
import { useUser } from "../../contexts/UserContext"
import modalArrow from "../../../assets/modalArrow.png"
import cropBox from "../../../assets/editImgOutline.png"
import { BaseModal } from "../baseModal";
import { lineWobble } from 'ldrs'
import { useState } from "react";
import Cropper from "react-easy-crop";

export default function EditModal({ onClose }: { onClose: () => void }) {
  const { user } = useUser();
  const [nextStep, setNextStep] = useState(false);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(true);
  lineWobble.register();

  const Step1 = ({ onClose }: { onClose: () => void }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if(file){
        const imgURL = URL.createObjectURL(file);
        setPreview(imgURL)
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
                <img src={user.img} style={{width: "120px"}} />
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
    const cropSize = { width: 120, height: 120 };
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
                <img src={cropBox} style={{position: "absolute", pointerEvents: "none"}} onLoad={() => setLoading(false)} />
                <S.CropWrapper>
                  <Cropper
                    image={preview}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    cropShape="round"
                    showGrid={false}
                    cropSize={cropSize}
                    objectFit="cover"
                    onCropChange={handleCropChange}
                    onZoomChange={setZoom}
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
            <S.BoxInput type="text" value="확인" onClick={() => {}} />
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