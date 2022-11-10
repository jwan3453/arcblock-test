import './index.css';

// 单个交易明细
const TxDetail = ({ detailData }) => {
    const { inputs, out} = detailData;
    return (
        <div className='detailBlock'>
            <div className='from'>
                <div className='header'>From</div>
                {
                    inputs.map((detail, index) => {
                        const { prev_out, index: inputIndex } = detail;
                        const { addr, value } = prev_out;
                        let shortAdds = addr ? ` ${addr.slice(0, 9)} - ${addr.slice(addr.length - 9)}` : ' ';
                        return (
                            <div key={inputIndex} className='detailContent'>
                                <div className='listIndex'>{`${index+1}. `}</div>
                                <div className='content'>
                                    <span>{shortAdds}</span>
                                    <span>{`${value / 100000000} BTC `}</span>
                                    <span>script</span>
                                </div>
                            </div>    
                        )
                    })
                }   
            </div>
            <div className='to'>
                <div className='header'>To</div>
                {
                    out.map((detail, index) => {
                        const { addr, value, script} = detail;
                        let shortAdds = addr ? ` ${addr.slice(0, 9)} - ${addr.slice(addr.length - 9)}` : '';
                        return (
                            <div key={script} className='detailContent' >
                                <div className='listIndex'>{`${index + 1}. `}</div>
                                <div className='content'>
                                    <span>{shortAdds}</span>
                                    <span>{`${value / 100000000} BTC `}</span>
                                    <span>script</span>
                                </div>

                            </div>
                        )
                    })
                }  
            </div>
        </div>
    )
}

export default TxDetail;