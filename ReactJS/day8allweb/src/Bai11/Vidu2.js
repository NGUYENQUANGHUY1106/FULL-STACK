import Mailbox from "./Mailbox";
function Vidu2()
{
    const arr = ['ReactJS', 'NodeJS', 'MongoDB', 'ExpressJS'];
    return (
        <div>
           <Mailbox data = {arr}/>
           {/* render thực thi mà k cần gọi tới */}
           {/* truyền data qua mail box */}
        </div>
    )
}   
export default Vidu2;