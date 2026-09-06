interface Props {
    src: string;
}

export default function NativePlayer({ src }: Props) {
    return (
        <video
            controls
            preload="metadata"
            playsInline
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            <source src={src} />

            Your browser doesn't support video playback.
        </video>
    );
}

/* Later you can replace this with Video.js, Plyr, HLS.js, DASH without changing any parent component. */