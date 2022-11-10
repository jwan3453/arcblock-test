import './index.css'
import antPool from '../../assets/antpool.svg';
import { formatNumber } from '../../util';


const base = 100000000;
const BtcPrice = 19000;

// 区块摘要
const BlockInfo = ({ blockData }) => {
    const {
        bits,
        block_index,
        fee,
        hash,
        height,
        main_chain,
        mrkl_root,
        next_block,
        nonce,
        prev_block,
        size,
        time,
        tx,
        ver,
        weight
    } = blockData || {};

    let inputs = 0, outputs = 0, witness = 0, inputValue = 0, outputValue = 0, averageValue = 0;
    if (tx) {
        tx && tx.forEach((item) => {
            let hasWitness = false
            item.inputs.forEach((inputItem) => {
                if (inputItem.witness)
                    hasWitness = true;
                const { value } = inputItem.prev_out
                inputValue += value
            })

            item.out.forEach((outItem) => {
                const { value } = outItem
                outputValue += value
            })
            if (hasWitness)
                witness++;
            inputs += item.inputs.length;
            outputs += item.out.length;
        })
        averageValue = inputValue / base / (tx.length);
    }
    const date = new Date(time * 1000);
    const dateString = `${date.toLocaleDateString("en-US")} ${date.toLocaleTimeString("it-IT")}`
   
    if (blockData) {
        return (
            <div className='blockInfo'>

                <div className='brief'>
                    <div className='logo'>
                        <img src={antPool} className='icon' />
                    </div>
                    <div className='title'>{`Bitcoin Block #${block_index}`}</div>
                </div>

                <div className='header'>Detail</div>
                <div className='info'>
                    <div className='list'>
                        <div><span>Hash</span><span>{` ${hash.slice(0, 4)}-${hash.slice(hash.length - 4)}`}</span></div>
                        <div><span>BTC</span><span>{formatNumber(Math.floor((inputValue / base)))}</span></div>
                        <div><span>Value</span><span>{formatNumber(Math.floor((inputValue / base)) * BtcPrice)}</span></div>
                        <div><span>Average Value</span><span>{`${averageValue.toFixed(8)} BTC`}</span></div>
                        <div><span>Input Value</span><span>{`${formatNumber((inputValue / base).toFixed(2))} BTC`}</span></div>
                        <div><span>Output Value</span><span>{`${formatNumber((outputValue / base).toFixed(2))} BTC`}</span></div>
                        <div><span>Transactions</span><span>{formatNumber(tx.length)}</span></div>
                        <div><span>Witness Tx’s</span><span>{formatNumber(witness)}</span></div>
                        <div><span>Inputs</span><span>{formatNumber(inputs)}</span></div>
                        <div><span>Outputs</span><span>{formatNumber(outputs)}</span></div>
                        <div><span>Fees</span><span>{`${fee / base} BTC`}</span></div>                        
                    </div>

                    <div className='list'>
                        <div><span>Size</span><span>{size}</span></div>
                        <div><span>Version</span><span>{ver}</span></div>
                        <div><span>Merkle Root</span><span>{` ${mrkl_root.slice(0, 4)}-${mrkl_root.slice(mrkl_root.length - 4)}`}</span></div>
                        <div><span>Nonce</span><span>{formatNumber(nonce)}</span></div>
                        <div><span>Bits</span><span>{formatNumber(bits)}</span></div>
                        <div><span>Weight</span><span>{formatNumber(weight)}</span></div>
                        <div><span>Minted</span><span>{dateString}</span></div>
                        <div><span>Height</span><span>{formatNumber(height)}</span></div>

                    </div>
                </div>
            </div>
        )
    }
}

export default BlockInfo;