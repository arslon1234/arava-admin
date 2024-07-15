
import { Popover } from 'antd';

const content = (text?:string)=> (
    <div className=' max-w-[300px]'>
      <p>{text}</p>
    </div>
);

const Index = ({text}:{text:string}) => (

    
  <Popover placement="topLeft" content={content(text)} title="Description text">
    <p>{text?.length < 25 ? text : "Description"}</p>
  </Popover>
);

export default Index;