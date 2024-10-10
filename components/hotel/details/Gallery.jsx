import Image from "next/image";

const Gallery = ({ gallery }) => {
  const sideImage = [...gallery];
  sideImage.shift();

  return (
    <section className="container">
      <div className="grid grid-cols-2 imageshowCase shadow-lg">
        <Image
          src={gallery[0]}
          className="h-[400px]"
          alt="Image"
          width={600}
          height={600}
        />

        <div className="grid grid-cols-2 grid-rows-2 h-[400px]">
          {sideImage?.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt="Sub-Image"
              className=" "
              width={400}
              height={400}
            ></Image>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
