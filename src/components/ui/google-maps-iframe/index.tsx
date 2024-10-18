
interface MapProps {
  gpsPointX: number;
  gpsPointY: number;
}

const Index: React.FC<MapProps> = ({ gpsPointX, gpsPointY }) => {
  const apiKey = "AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"; 
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${gpsPointX},${gpsPointY}&zoom=10&maptype=roadmap`;

  return (
    <div className="w-full mt-5 ">
      <iframe
        id="google-map"
        width="100%"
        className=" rounded-md"
        height="450"
        loading="lazy"
        allowFullScreen
        src={mapSrc}
        style={{ border: 0 }}
      ></iframe>
    </div>
  );
};

export default Index;
