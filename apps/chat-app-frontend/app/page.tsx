import Image, { type ImageProps } from "next/image";
import HomePage from "../components/HomePage";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  return (
    <div className=" w-full h-fit overflow-x-hidden" style={{overflowX : "hidden"}}><HomePage /></div>
  );
}
