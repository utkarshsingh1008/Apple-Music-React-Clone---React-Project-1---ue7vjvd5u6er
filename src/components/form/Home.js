import axios from "axios"
import { useEffect,useState } from "react"
function Home() {
    const [list, setList] = useState([]);
    const listOfSong = async()=>{
        axios.get('https://academics.newtonschool.co/api/v1/music/song').then((res)=>{
            console.log(res);
            setList(res.data.data);
        }).catch((error)=>{
            console.log(error);
        })
    }
    useEffect(()=>{
        listOfSong();
    },[])

    const onFilter = async(input)=>{
        
        axios.get(`https://academics.newtonschool.co/api/v1/music/song?filter={"featured":""}`).then(()=>{
            console.log(res);
        }).catch((error)=>{
            console.log(error);
        })
    }
    return (
        
        <div className="ml-80" style={{  display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {list.map((obj, index) => (
          <div key={index} style={{ flex: '0 0 calc(33.33% - 16px)', maxWidth: 'calc(33.33% - 16px)', boxSizing: 'border-box', marginBottom: '16px' }}>
            <img
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              src={obj.thumbnail}
              alt={`Thumbnail ${index}`}
            />
            {/* Additional card content can be added here */}
          </div>
        ))}
      </div>
      );
}

export default Home
