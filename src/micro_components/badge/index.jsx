import "./badge.css"
import PropTypes from 'prop-types';

function Badge({times}) {

    if(times < 10){
        return(<h6 className="badge-S badge">{times}</h6>)
    }else if(times >=10 && times < 100){
        return(<h6 className="badge-M badge">{times}</h6>)
    }else{
        return(<h6 className="badge-L badge">{times}</h6>)
    }
}

export default Badge

Badge.propTypes = {
    times: PropTypes.number
}