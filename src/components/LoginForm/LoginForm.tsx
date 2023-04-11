import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useState } from "react";

export default function CredentialsModal() {
    const [lields, setFeild] = useState({ name: "", password: "" });

    const setInput = (e: ChangeEvent<HTMLInputElement>) => {
        setFeild((prev) => ({
            ...prev,
            [e.target?.id]: e.target?.value,
        }));
    };

    const createToken = () => {
        const token = window.btoa(`${lields.name}:${lields.password}`);
        localStorage.setItem("authorization_token", token);
        setFeild({ name: "", password: "" });
    };

    return (
        <>
            <Box sx={{ padding: "48px" }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Log in Form
                </Typography>
                <Box
                    component="form"
                    sx={{
                        "& > :not(style)": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="name"
                        label="name"
                        variant="outlined"
                        value={lields.name}
                        onChange={setInput}
                    />
                    <TextField
                        id="password"
                        label="password"
                        variant="outlined"
                        value={lields.password}
                        onChange={setInput}
                    />
                    <br />
                    <Button variant="contained" onClick={createToken}>
                        login
                    </Button>
                </Box>
            </Box>
        </>
    );
}
