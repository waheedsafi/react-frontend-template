import { useDownloadStore } from "./download-store";

export const GlobalDownloader = () => {
  const downloads = useDownloadStore((s) => s.downloads);
  const pause = useDownloadStore((s) => s.pauseDownload);
  const resume = useDownloadStore((s) => s.resumeDownload);
  const cancel = useDownloadStore((s) => s.cancelDownload);
  const clearCompleted = useDownloadStore((s) => s.clearCompleted);
  const clearAll = useDownloadStore((s) => s.clearAll);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div
      style={{
        padding: 16,
        position: "fixed",
        bottom: 20,
        right: 20,
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: 8,
        width: 320,
        maxHeight: "50vh",
        overflowY: "auto",
      }}
    >
      <h4>Downloader</h4>

      <div style={{ marginBottom: 10 }}>
        <button onClick={clearCompleted} style={{ marginRight: 8 }}>
          Clear Completed
        </button>
        <button onClick={clearAll}>Clear All</button>
      </div>

      {downloads.length === 0 && <div>No active downloads</div>}

      {downloads.map((d) => (
        <div
          key={d.id}
          style={{
            marginBottom: 10,
            borderBottom: "1px solid #eee",
            paddingBottom: 8,
          }}
        >
          <div>
            <strong>{d.filename}</strong>
            <span style={{ float: "right" }}>{d.progress}%</span>
          </div>
          <div
            style={{
              height: 6,
              background: "#eee",
              margin: "4px 0",
              borderRadius: 3,
            }}
          >
            <div
              style={{
                width: `${d.progress}%`,
                height: "100%",
                background: "#4caf50",
                transition: "width 0.3s",
                borderRadius: 3,
              }}
            ></div>
          </div>
          <div style={{ fontSize: 12, color: "#666" }}>
            {formatBytes(d.received)} / {d.total ? formatBytes(d.total) : "?"}
          </div>
          <div style={{ fontSize: 12, color: "#666" }}>{d.status}</div>
          <div style={{ marginTop: 4 }}>
            {d.status === "in-progress" && (
              <>
                <button onClick={() => pause(d.id)}>Pause</button>
                <button onClick={() => cancel(d.id)} style={{ marginLeft: 8 }}>
                  Cancel
                </button>
              </>
            )}
            {d.status === "paused" && (
              <>
                <button onClick={() => resume(d.id)}>Resume</button>
                <button onClick={() => cancel(d.id)} style={{ marginLeft: 8 }}>
                  Cancel
                </button>
              </>
            )}
            {d.status === "queued" && (
              <button onClick={() => cancel(d.id)}>Cancel</button>
            )}
            {(d.status === "failed" || d.status === "cancelled") && (
              <button onClick={() => cancel(d.id)}>Remove</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
