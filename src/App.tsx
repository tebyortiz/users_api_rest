import {
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Divider,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";

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
    <div style={{ textAlign: "center", marginTop: "100px", height: "100%" }}>
      <div className="text-center mt-20 mb-10">
        <Card
          variant="outlined"
          className="mx-auto p-6 max-w-max bg-blue-100 shadow-lg rounded-lg"
        >
          <Typography
            variant="h3"
            gutterBottom
            className="font-sans font-semibold"
          >
            PRUEBA DE API REST "ReqRes"
          </Typography>
        </Card>
      </div>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ height: "100%" }}
      >
        <Grid item xs={3}>
          <Card
            className="h-full flex flex-col bg-green-200 rounded-3xl shadow-lg overflow-hidden"
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent
              style={{
                flex: "1 0 auto",
                background:
                  "linear-gradient(to top, white, rgba(255, 255, 255, 0) 120%)",
              }}
            >
              <Typography variant="h4" className="text-2x2 font-bold mt-8 mb-8">
                GET
              </Typography>
              <Divider />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "50px",
                  marginBottom: "10px",
                }}
              >
                <Typography
                  variant="body1"
                  className="font-bold"
                  style={{ fontSize: "15px", marginRight: "5px" }}
                >
                  https://reqres.in/api/users/
                </Typography>
                <input
                  type="text"
                  className="border border-gray-400 rounded-md px-2 py-2 focus:outline-none"
                  value={userIdGet}
                  onChange={(e) => setUserIdGet(e.target.value)}
                  style={{ width: "80px" }}
                />
              </div>

              <Button
                variant="contained"
                onClick={handleSearch}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                style={{ marginTop: "10px" }}
              >
                Buscar
              </Button>
              {userDataGet ? (
                <Card
                  style={{ marginTop: "20px" }}
                  className="rounded-3xl shadow-lg"
                >
                  <CardContent className="flex flex-col items-center">
                    <Typography>ID: {userDataGet.id}</Typography>
                    <Typography>
                      First Name: {userDataGet.first_name}
                    </Typography>
                    <Typography>Last Name: {userDataGet.last_name}</Typography>
                    <Typography>Email: {userDataGet.email}</Typography>
                    <div className="mt-4">
                      <img
                        src={userDataGet.avatar}
                        alt="Avatar"
                        className="w-32 h-32 rounded-full object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card
                  style={{ marginTop: "20px" }}
                  className="rounded-3xl shadow-lg"
                >
                  <CardContent>
                    <Typography>ID de usuario inexistente</Typography>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card
            className="h-full flex flex-col bg-yellow-200 rounded-3xl shadow-lg"
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent
              style={{
                flex: "1 0 auto",
                background:
                  "linear-gradient(to top, white, rgba(255, 255, 255, 0) 80%)",
              }}
            >
              <Typography variant="h4" className="text-2x2 font-bold mt-8 mb-8">
                POST
              </Typography>
              <Divider />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "50px",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Typography
                    variant="body1"
                    style={{ marginRight: "5px" }}
                    className="font-bold"
                  >
                    Nombre:
                  </Typography>
                  <input
                    type="text"
                    className="border border-gray-400 rounded-md px-2 py-2 focus:outline-none"
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
                  <Typography
                    variant="body1"
                    style={{ marginRight: "5px" }}
                    className="font-bold"
                  >
                    Trabajo:
                  </Typography>
                  <input
                    type="text"
                    className="border border-gray-400 rounded-md px-2 py-2 focus:outline-none"
                    value={postData.job}
                    onChange={(e) =>
                      setPostData({ ...postData, job: e.target.value })
                    }
                  />
                </div>

                <Button
                  variant="contained"
                  onClick={handlePost}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  style={{ marginTop: "10px" }}
                >
                  ENVIAR
                </Button>
              </div>

              {postResponse && (
                <Card
                  style={{ marginTop: "20px" }}
                  className="rounded-3xl shadow-lg"
                >
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
          <Card
            className="h-full flex flex-col bg-blue-200 rounded-3xl shadow-lg"
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent
              style={{
                flex: "1 0 auto",
                background:
                  "linear-gradient(to top, white, rgba(255, 255, 255, 0) 80%)",
              }}
            >
              <Typography variant="h4" className="text-2x2 font-bold mt-8 mb-8">
                PUT
              </Typography>
              <Divider />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "50px",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Typography
                    variant="body1"
                    style={{ marginRight: "5px" }}
                    className="font-bold"
                  >
                    ID:
                  </Typography>
                  <input
                    type="text"
                    className="border border-gray-400 rounded-md px-2 py-2 focus:outline-none"
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
                  <Typography
                    variant="body1"
                    style={{ marginRight: "5px" }}
                    className="font-bold"
                  >
                    Nuevo Nombre:
                  </Typography>
                  <input
                    type="text"
                    className="border border-gray-400 rounded-md px-2 py-2 focus:outline-none"
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
                  <Typography
                    variant="body1"
                    style={{ marginRight: "5px" }}
                    className="font-bold"
                  >
                    Nuevo Trabajo:
                  </Typography>
                  <input
                    type="text"
                    className="border border-gray-400 rounded-md px-2 py-2 focus:outline-none"
                    value={putData.job}
                    onChange={(e) =>
                      setPutData({ ...putData, job: e.target.value })
                    }
                  />
                </div>
                <Button
                  variant="contained"
                  onClick={handlePut}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  style={{ marginTop: "10px" }}
                >
                  ACTUALIZAR
                </Button>
              </div>

              {putResponse && (
                <Card
                  style={{ marginTop: "20px" }}
                  className="rounded-3xl shadow-lg"
                >
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
          <Card
            className="h-full flex flex-col bg-red-200 rounded-3xl shadow-lg"
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent
              style={{
                flex: "1 0 auto",
                background:
                  "linear-gradient(to top, white, rgba(255, 255, 255, 0) 80%)",
              }}
            >
              <Typography variant="h4" className="text-2x2 font-bold mt-8 mb-8">
                DELETE
              </Typography>
              <Divider />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "50px",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Typography
                    variant="body1"
                    style={{ marginRight: "5px" }}
                    className="font-bold"
                  >
                    ID a Eliminar:
                  </Typography>
                  <input
                    type="text"
                    className="border border-gray-400 rounded-md px-2 py-2 focus:outline-none"
                    value={deleteData.id}
                    onChange={(e) =>
                      setDeleteData({ ...deleteData, id: e.target.value })
                    }
                  />
                </div>
                <Button
                  variant="contained"
                  onClick={handleDelete}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  style={{ marginTop: "10px" }}
                >
                  ELIMINAR
                </Button>
              </div>

              {deleteMessage && (
                <Card
                  style={{ marginTop: "20px" }}
                  className="rounded-3xl shadow-lg"
                >
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