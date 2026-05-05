import { useState } from "react";
import Cropper from "react-easy-crop";
import { lineWobble } from "ldrs";
import { patchEditUserImg } from "../../../api/my";
import { useUser } from "../../contexts/UserContext";
import { BaseModal } from "../baseModal";
import * as S from "./styleA";

lineWobble.register();

type CropArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export default function EditModal({ onClose }: { onClose: () => void }) {
  const { user, setUser } = useUser();
  const [nextStep, setNextStep] = useState(false);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);

  const Step1 = ({ onClose: handleClose }: { onClose: () => void }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) {
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setNextStep(true);
    };

    return (
      <BaseModal onClose={handleClose}>
        <S.BoxA>
          <S.BoxContent>
            <S.BoxHeader>
              <img src={modalArrow} onClick={handleClose} style={{ cursor: "pointer" }} />
              <S.BoxHeaderTitle>프로필 사진 추가</S.BoxHeaderTitle>
            </S.BoxHeader>
            <S.ProfileOutlien>
              <img src={user.img} style={{ width: "120px", borderRadius: "50%" }} />
            </S.ProfileOutlien>
          </S.BoxContent>
          <S.BoxLine />
          <S.BoxInput readOnly id="upload" type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
          <S.Label htmlFor="upload">컴퓨터에서 불러오기</S.Label>
        </S.BoxA>
      </BaseModal>
    );
  };

  const Step2 = ({ onClose: handleClose }: { onClose: () => void }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea>({ x: 0, y: 0, width: 120, height: 120 });
    const cropSize = { width: 120, height: 120 };

    const getCroppedImg = async (imageSrc: string, area: CropArea) => {
      const image = new Image();
      image.src = imageSrc;
      await new Promise((resolve) => {
        image.onload = resolve;
      });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("이미지를 자를 수 없습니다.");
      }

      canvas.width = cropSize.width;
      canvas.height = cropSize.height;
      ctx.drawImage(image, area.x, area.y, area.width, area.height, 0, 0, cropSize.width, cropSize.height);

      return canvas.toDataURL("image/jpeg", 0.9);
    };

    const handleSave = async () => {
      const croppedUrl = await getCroppedImg(preview, croppedAreaPixels);
      setUser({ ...user, img: croppedUrl });
      await patchEditUserImg(user.id, croppedUrl);
      handleClose();
    };

    return (
      <BaseModal onClose={handleClose}>
        <S.BoxA>
          <S.BoxContent>
            <S.BoxHeader>
              <img src={modalArrow} onClick={handleClose} style={{ cursor: "pointer" }} />
              <S.BoxHeaderTitle>프로필 사진 추가</S.BoxHeaderTitle>
            </S.BoxHeader>
            <S.ProfileBox>
              <img src={cropBox} style={{ position: "absolute", pointerEvents: "none" }} />
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
                  onCropComplete={(_, croppedPixels) => setCroppedAreaPixels(croppedPixels)}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onMediaLoaded={() => setLoading(false)}
                />
              </S.CropWrapper>
            </S.ProfileBox>
          </S.BoxContent>
          {loading && (
            <S.SpinnerBox>
              <l-line-wobble size="520" stroke="6" bg-opacity="0.1" speed="5" color="#00C471"></l-line-wobble>
            </S.SpinnerBox>
          )}
          {!loading && <S.BoxLine />}
          <S.BoxInput type="button" value="확인" onClick={handleSave} />
        </S.BoxA>
      </BaseModal>
    );
  };

  return nextStep ? <Step2 onClose={onClose} /> : <Step1 onClose={onClose} />;
}

