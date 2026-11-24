// Preloader du template (masque par custom.js sur l'evenement `load`).
export default function Preloader() {
  return (
    <div id="preloader">
      <div className="jumper">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
