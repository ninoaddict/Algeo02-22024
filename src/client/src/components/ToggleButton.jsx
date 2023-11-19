export default function Toggle({ enabled, handleToggleClick }) {
  return (
    <div>
      <h1 className="text-textColor">Choose Method</h1>
      <div className="flex items-center space-x-4">
        <h1
          className={`text-textColor transform transition-transform duration-500 ${
            enabled ? "" : "text-backColor2 font-bold "
          }`}
        >
          Color
        </h1>
        <div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="checkbox"
              className="sr-only peer"
              checked={enabled}
              readOnly
            />
            <div
              onClick={handleToggleClick}
              className="w-11 h-6 bg-backColor2 rounded-full peer peer-focus:ring-backColor2 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accentColor"
            ></div>
          </label>
        </div>
        <h1
          className={`text-textColor transform transition-transform duration-500 ${
            enabled ? "text-accentColor font-bold" : ""
          }`}
        >
          Texture
        </h1>
      </div>
    </div>
  );
}
