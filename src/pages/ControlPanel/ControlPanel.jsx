
import React, { useState } from "react";

const ScpiCommandForm = () => {
  const [command, setCommand] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendCommand = async (e) => {
    e.preventDefault();

    if (!command.trim()) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch(
        "http://signalmaster.local/api/instruments/sendCommand/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            command: command,
          }),
        }
      );

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setResponse({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scpi">
      <h2 className="scpi__title">SCPI Command</h2>

      <form className="scpi__form" onSubmit={sendCommand}>
        <textarea
          className="scpi__input"
          placeholder="Например: *IDN?"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        />

        <button
          className="scpi__button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Отправка..." : "Отправить"}
        </button>
      </form>

      {response && (
        <div className="scpi__response">
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ScpiCommandForm;