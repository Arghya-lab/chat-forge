import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import "@livekit/components-styles";
import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  // VideoConference,
  useTracks,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import axios, { authHeader } from "../../utils/axios";
import { Loader2 } from "lucide-react";

function MediaRoom({ video, audio }) {
  const { selectedChannel } = useSelector((state) => state.selected);
  const channelId = selectedChannel?.id;

  const [token, setToken] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/livekit/${channelId}`, authHeader);
        setToken(res.data?.token);
      } catch (error) {
        console.log(error.message);
      }
    })();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  useEffect(() => {
    console.log(token);
  }, [token]);

  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  return !token ? (
    <div className="flex flex-col flex-1 justify-center items-center">
      <Loader2 className="h-12 w-12 text-shadow-700 dark:text-pearl-500 animate-spin my-4" />
      <p className="text-shadow-500 dark:text-pearl-900">Loading...</p>
    </div>
  ) : (
    <LiveKitRoom
      video={video}
      audio={audio}
      token={token}
      connect={true}
      serverUrl={import.meta.env.VITE_PUBLIC_LK_SERVER_URL}
      // Use the default LiveKit theme for nice styles.
      data-lk-theme="default"
      style={{ height: "calc(100% - 3.5rem)" }}>
      <GridLayout
        tracks={tracks}
        style={{ height: "calc(100% -3.5rem - var(--lk-control-bar-height))" }}>
        {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
        <ParticipantTile />
      </GridLayout>
      {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
      <RoomAudioRenderer />
      {/* Controls for the user to start/stop audio, video, and screen 
    share tracks and to leave the room. */}
      <ControlBar />
    </LiveKitRoom>
  );
}

MediaRoom.propTypes = {
  video: PropTypes.bool.isRequired,
  audio: PropTypes.bool.isRequired,
};

export default MediaRoom;
