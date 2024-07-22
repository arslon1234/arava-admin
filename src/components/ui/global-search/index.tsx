import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";



interface PropsDataSerch{
    search:string;
    handleChange:any;
}

function Index({search , handleChange }:PropsDataSerch) {
  return <>
  
  <div className="max-w-96">
           <Paper 
           component="form"
           sx={{p:"2px 4px",maxWidth:400, width: "100%" ,  alignItems: "center" , display: "flex"}}>
            <InputBase
             sx={{ml:1 , flex :1}}
             placeholder="Search"
             value={search}
             onChange={handleChange}
             inputProps={{"aria-label":"serch google maps"}}/>
            <IconButton type="button" sx={{p: "10px"}} aria-label="search" >
                <SearchIcon/>
            </IconButton>

           </Paper>
        </div>
  </>
}

export default Index