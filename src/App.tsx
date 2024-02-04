import {
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

interface PostData {
  name: string;
  job: string;
}

interface PutData {
  id: string;
  name: string;
  job: string;
}

interface DeleteData {
  id: string;
}

function App() {
  const [userDataGet, setUserDataGet] = useState<UserData | null>(null);
  const [userIdGet, setUserIdGet] = useState("");
  const [postData, setPostData] = useState<PostData>({
    name: "",
    job: "",
  });
  const [postResponse, setPostResponse] = useState<any | null>(null);
  const [putData, setPutData] = useState<PutData>({
    id: "",
    name: "",
    job: "",
  });
  const [putResponse, setPutResponse] = useState<any | null>(null);
  const [deleteData, setDeleteData] = useState<DeleteData>({
    id: "",
  });

  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://reqres.in/api/users/${userIdGet}`
      );

      if (response.data.data) {
        setUserDataGet(response.data.data);
      } else {
        setUserDataGet(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);

      setUserDataGet(null);
    }
  };

  const handlePost = async () => {
    try {
      const response = await axios.post(
        "https://reqres.in/api/users",
        postData
      );

      setPostResponse(response.data);
    } catch (error) {
      console.error("Error with POST request:", error);

      setPostResponse(null);
    }
  };

  const handlePut = async () => {
    try {
      const response = await axios.put(
        `https://reqres.in/api/users/${putData.id}`,
        putData
      );

      setPutResponse(response.data);
    } catch (error) {
      console.error("Error with PUT request:", error);

      setPutResponse(null);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://reqres.in/api/users/${deleteData.id}`
      );

      if (response.status === 204) {
        setDeleteMessage(
          `Usuario con ID ${deleteData.id} eliminado con éxito.`
        );
      } else {
      }
    } catch (error) {
      console.error("Error with DELETE request:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop:"100px" }}>
      <Typography variant="h3" gutterBottom style={{ marginBottom: "50px" }}>
        Prueba de Api Rest ReqRes
      </Typography>

      <Grid container spacing={2} justifyContent="center" >
        <Grid item xs={3} >
        <Card>
            <CardContent>
              <Typography variant="h5">GET</Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                <Typography
                  variant="body1"
                  style={{ fontSize: "15px", marginRight: "5px" }}
                >
                  https://reqres.in/api/users/
                </Typography>
                <TextField
                  label="ID"
                  variant="outlined"
                  value={userIdGet}
                  onChange={(e) => setUserIdGet(e.target.value)}
                  style={{ width: "80px" }}
                />
              </div>

              <Button variant="contained" onClick={handleSearch}>
                Buscar
              </Button>
              {userDataGet ? (
                <Card style={{ marginTop: "20px" }}>
                  <CardContent>
                    <Typography>ID: {userDataGet.id}</Typography>
                    <Typography>
                      First Name: {userDataGet.first_name}
                    </Typography>
                    <Typography>Last Name: {userDataGet.last_name}</Typography>
                    <Typography>Email: {userDataGet.email}</Typography>
                    <img
                      src={userDataGet.avatar}
                      alt="Avatar"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        marginTop: "10px",
                      }}
                    />
                  </CardContent>
                </Card>
              ) : (
                <Card style={{ marginTop: "20px" }}>
                  <CardContent>
                    <Typography>ID de usuario inexistente</Typography>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">POST</Typography>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Typography variant="body1" style={{ marginRight: "5px" }}>
                    Nombre:
                  </Typography>
                  <TextField
                    label="Nombre"
                    variant="outlined"
                    value={postData.name}
                    onChange={(e) =>
                      setPostData({ ...postData, name: e.target.value })
                    }
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Typography variant="body1" style={{ marginRight: "5px" }}>
                    Trabajo:
                  </Typography>
                  <TextField
                    label="Trabajo"
                    variant="outlined"
                    value={postData.job}
                    onChange={(e) =>
                      setPostData({ ...postData, job: e.target.value })
                    }
                  />
                </div>

                <Button
                  variant="contained"
                  onClick={handlePost}
                  style={{ marginTop: "10px" }}
                >
                  ENVIAR
                </Button>
              </div>

              {postResponse && (
                <Card style={{ marginTop: "20px" }}>
                  <CardContent>
                    <Typography>Respuesta POST:</Typography>
                    <pre>{JSON.stringify(postResponse, null, 2)}</pre>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">PUT</Typography>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Typography variant="body1" style={{ marginRight: "5px" }}>
                    ID:
                  </Typography>
                  <TextField
                    label="ID"
                    variant="outlined"
                    value={putData.id}
                    onChange={(e) =>
                      setPutData({ ...putData, id: e.target.value })
                    }
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Typography variant="body1" style={{ marginRight: "5px" }}>
                    Nuevo Nombre:
                  </Typography>
                  <TextField
                    label="Nuevo Nombre"
                    variant="outlined"
                    value={putData.name}
                    onChange={(e) =>
                      setPutData({ ...putData, name: e.target.value })
                    }
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Typography variant="body1" style={{ marginRight: "5px" }}>
                    Nuevo Trabajo:
                  </Typography>
                  <TextField
                    label="Nuevo Trabajo"
                    variant="outlined"
                    value={putData.job}
                    onChange={(e) =>
                      setPutData({ ...putData, job: e.target.value })
                    }
                  />
                </div>
                <Button
                  variant="contained"
                  onClick={handlePut}
                  style={{ marginTop: "10px" }}
                >
                  ACTUALIZAR
                </Button>
              </div>

              {putResponse && (
                <Card style={{ marginTop: "20px" }}>
                  <CardContent>
                    <Typography>Respuesta PUT:</Typography>
                    <pre>{JSON.stringify(putResponse, null, 2)}</pre>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">DELETE</Typography>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Typography variant="body1" style={{ marginRight: "5px" }}>
                    ID a Eliminar:
                  </Typography>
                  <TextField
                    label="ID"
                    variant="outlined"
                    value={deleteData.id}
                    onChange={(e) =>
                      setDeleteData({ ...deleteData, id: e.target.value })
                    }
                  />
                </div>
                <Button
                  variant="contained"
                  onClick={handleDelete}
                  style={{ marginTop: "10px" }}
                >
                  ELIMINAR
                </Button>
              </div>

              {deleteMessage && (
                <Card style={{ marginTop: "20px" }}>
                  <CardContent>
                    <Typography>{deleteMessage}</Typography>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
