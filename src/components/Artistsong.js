import { Card,Typography,Table,TableRow,TableHead,TableCell,TableBody,CardContent } from "@mui/material";
import { useUser } from "../context/UserProvider"

function Artistsong() {

 const{songId, setAudioPlayer} = useUser();

 const onMusicHandler = (song)=>{
  setAudioPlayer(song)
 }
  return (
  
  <Card>
     <CardContent>
        <Typography variant="h5" component="h1">{songId}</Typography>
        <img src={songId}  width="300px" alt="" />
        <Typography variant="body1">{songId}</Typography>

        <Table>
          <TableHead>
            <TableRow>
             
              <TableCell>Thumbnail</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Release Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {songId.songs && songId.songs.map((obj, index) => (
              <TableRow key={index}>
               
                <TableCell>
                  <img src={obj.thumbnail} alt={`Thumbnail of ${obj.title}`} style={{ width: '50px', height: '50px' }} />
                </TableCell>
                <TableCell>{obj.title}</TableCell>
                <TableCell>{new Date(obj.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button onClick={() => onMusicHandler(obj)} variant="contained" color="primary">Play</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody> */}
        </Table>
      </CardContent>
    </Card>
  
  )
}

export default Artistsong
