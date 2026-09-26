function Warning(props)
    {
    if(!props.warning)
        // nếu khác true thì return null và không render ra gì cả
    {
        return null
    }
    return (
        <div>
          Warning {props.children}
          {/* children là những thứ nằm giữa các thẻ mở và đóng của component Warning */}
        </div>
    )
}
export default Warning;