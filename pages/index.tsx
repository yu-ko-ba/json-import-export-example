import { Button, Container, Stack, styled, TextField } from "@mui/material";
import { saveAs } from "file-saver";
import Head from "next/head";
import { ChangeEvent, useState } from "react";

// 参考
// https://mui.com/material-ui/react-button/#system-InputFileUpload.tsx
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Home() {
  const [loadedJson, setLoadedJson] = useState({});

  return (
    <Container maxWidth="md">
      <Head>
        <title>json-import-export-example</title>
      </Head>
      <Stack spacing={2}>
        <Stack spacing={2} direction="row">
          <Button
            component="label"
            variant="contained"
            sx={{ textTransform: "none" }}
            fullWidth
          >
            import
            <VisuallyHiddenInput
              type="file"
              onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                const j = JSON.parse(await e.currentTarget.files![0].text());
                setLoadedJson(j);
                console.log(j);
                // 同じファイルを選んだときにもonChangeが発火するようにする
                e.target.value = "";
              }}
            />
          </Button>
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={() => {
              const b = new Blob([JSON.stringify(loadedJson, null, 2)], {
                type: "application/json",
              });
              saveAs(b, "export.json");
            }}
            fullWidth
          >
            export
          </Button>
        </Stack>
        <TextField
          value={JSON.stringify(loadedJson, null, 4)}
          multiline
          disabled
        />
      </Stack>
    </Container>
  );
}
