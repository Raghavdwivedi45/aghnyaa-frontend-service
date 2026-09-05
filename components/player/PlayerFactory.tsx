import { IVideo } from "@/constants/interfaces";
import NativePlayer from "./NativePlayer";
import EmbedPlayer from "./EmbedPlayer";

export default function PlayerFactory({ currentVideo }: { currentVideo: IVideo }) {

    if (currentVideo.videoURL) {
        return <NativePlayer src={currentVideo.videoURL} />;
    }

    if (currentVideo.embedUrl) {
        return <EmbedPlayer currentVideo={currentVideo} />;
    }

    return (
        <div>
            Unable to play this video.
        </div>
    );
}