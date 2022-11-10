
import Arrow from '../../assets/arrow.svg';
import TxDetail from '../txDetail';
import { abbreviateNumber, formatNumber } from '../../util';
import './index.css'

const BtcPrice = 19000;

//  分页交易列表
const txList = ({ currentList, showItemArr, showDetail }) => {
    return (
        <div>
        {
            currentList.map((item, index) => {
                const { hash, originIndex, time, out, fee } = item;
                const date = new Date(time * 1000);
                const dateString = `${date.toLocaleDateString("en-US")} ${date.toLocaleTimeString("it-IT")}`
                const totalValue = out.reduce((pre, current) => {
                    return pre + current.value
                }, 0);
                return (
                    <div key={hash} onClick={() => showDetail(index)}>
                        <div className='txBlock'>
                            <div className='left'>
                                <div className='top'>
                                    <span>{`TX ${originIndex} `}</span>
                                    <span className='divider'>{``}</span>
                                    <span className='hash'>{`• Hash`}
                                        <span>{` ${hash.slice(0, 4)} - ${hash.slice(hash.length - 4)}`}</span>
                                    </span>
                                </div>
                                <div className='bottom'>
                                    <span>{dateString}</span>
                                </div>
                            </div>
                            <div className='right'>
                                <div className='info'>
                                    <div className='top'>
                                        <span>{`${totalValue / 100000000} BTC `}</span>
                                        <span className='inUsd'>{`$${formatNumber(parseInt(totalValue / 100000000 * BtcPrice))}`}</span>
                                    </div>
                                    <div className='bottom'>
                                        <span>Fee </span>
                                        <span>{` ${abbreviateNumber(fee)} Sats`}</span>
                                        <span>{` $${(fee / 100000000 * BtcPrice).toFixed(2)} `}</span>
                                    </div>
                                </div>
                                <img src={Arrow} className={`arrowIcon ${showItemArr.indexOf(index) !== -1 && 'selected'} `}  />
                            </div>
                        </div>
                        <div className={`hideDetail ${showItemArr.indexOf(index) !== -1 && 'showContent'} `}>
                            <TxDetail detailData={item}/>
                        </div>
                    </div>
                )
            })
            }
        </div>
     )
}
export default txList;