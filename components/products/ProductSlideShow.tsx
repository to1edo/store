import { FC } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "450px",
};

interface Images {
  images: string[];
}
export const ProductSlideShow: FC<Images> = ({ images }) => {
  return (
    <Slide easing="ease" duration={10000} indicators>
      {images.map((image) => {
        const url = `/products/${image}`;
        return (
          <div key={image}>
            <div
              style={{
                ...divStyle,
                backgroundImage: `url(${url})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center"
              }}
            ></div>
          </div>
        );
      })}
    </Slide>
  );
};
