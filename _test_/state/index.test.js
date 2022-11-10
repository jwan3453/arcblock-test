
/**
* @jest-environment jsdom
*/


import { formatNumber, abbreviateNumber } from '../../src/util';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import BlockInfo from '../../src/components/blockInfo';
import TxList from '../../src/components/txList';
import TxDetail from '../../src/components/txDetail';

const mockData1 = {
    "hash": "0000000000000000000ef9c073beedafb33a4f1874b80ac16500516e782f5b85",
    "ver": 536870912,
    "prev_block": "00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa",
    "mrkl_root": "4677689fc83be65b59c21be4d24ddce262371d813cf44918ad26691b62993fce",
    "time": 1608621271,
    "bits": 386863986,
    "next_block": [
        "00000000000000000002fe4f82ae5afa5a0c49085c109c729528754585fe2934"
    ],
    "fee": 32516571,
    "nonce": 4157703680,
    "n_tx": 1867,
    "size": 1267072,
    "block_index": 662464,
    "main_chain": true,
    "height": 662464,
    "weight": 3993220,
    "tx": [
        {
            "hash": "eb236e40bba07514e21b48c1b919098f7c1c3a2f59462dd713637cd1e6877c08",
            "ver": 2,
            "vin_sz": 2,
            "vout_sz": 2,
            "size": 419,
            "weight": 1031,
            "fee": 77700,
            "relayed_by": "0.0.0.0",
            "lock_time": 0,
            "tx_index": 298590368575372,
            "double_spend": false,
            "time": 1608621271,
            "block_index": 662464,
            "block_height": 662464,
            "inputs": [
                {
                    "sequence": 4294967293,
                    "witness": "02473044022026e3c5410fb02aba8190c545e60c8a3ede03fe7ba16f9a158897b12c899528b402205d8c8ce568238ca3464e3093a8ee4bbca3b41886c0ff31150730d7678c6d9c250121037ef7c159605d43e78d4c1ad53b53e60e46bcc504ad9bca6c33fd889fcc324eea",
                    "script": "160014f8513401ea5e9dcd57597e8a736f162572d19079",
                    "index": 0,
                    "prev_out": {
                        "addr": "3M92sq9ssFaNbEwF47uteVKJsbw125juS7",
                        "n": 1,
                        "script": "a914d55600283b297e12a0a8e1a92da7c03c0bcb6c5287",
                        "spending_outpoints": [
                            {
                                "n": 0,
                                "tx_index": 298590368575372
                            }
                        ],
                        "spent": true,
                        "tx_index": 3565500545547983,
                        "type": 0,
                        "value": 55157032
                    }
                },
            ],
            "out": [
                {
                    "type": 0,
                    "spent": true,
                    "value": 3608962,
                    "spending_outpoints": [
                        {
                            "tx_index": 1138312666292151,
                            "n": 0
                        }
                    ],
                    "n": 0,
                    "tx_index": 298590368575372,
                    "script": "a914d55600283b297e12a0a8e1a92da7c03c0bcb6c5287",
                    "addr": "3M92sq9ssFaNbEwF47uteVKJsbw125juS7"
                }
            ]
        }
    ] 
}

test('number should add common 1', () => {
    expect(formatNumber(111111)).toBe('111,111');
});

test('number should add common 2', () => {
    expect(formatNumber(1234567)).toBe('1,234,567');
});

test('number should add common 3', () => {
    expect(formatNumber(123)).toBe('123');
});


test('abbreviate number 1', () => {
    expect(formatNumber(123)).toBe('123');
});

test('abbreviate number 2', () => {
    expect(abbreviateNumber(1234)).toBe('1.2k');
});

test('abbreviate number 3', () => {
    expect(abbreviateNumber(12345)).toBe('12.3k');
});

test('abbreviate number 4', () => {
    expect(abbreviateNumber(1233)).toBe('1.2k');
});

test('abbreviate number 5', () => {
    expect(abbreviateNumber(1233564)).toBe('1.2M');
});

/* 测试blockInfo 组件 */
test('title should be on the screen', () => {

    render(<BlockInfo blockData={mockData1} />);
    const title = screen.getByText('Bitcoin Block #662464');
    expect(title).toBeInTheDocument();
});

test('nonce should be on the screen', () => {
    render(<BlockInfo blockData={mockData1} />);
    const nonce = screen.getByText('4,157,703,680');
    expect(nonce).toBeInTheDocument();
});

test('bits should be on the screen', () => {

    render(<BlockInfo blockData={mockData1} />);
    const bits = screen.getByText('386,863,986');
    expect(bits).toBeInTheDocument();
});
/*********************************** */

/* 测试txList 组件 */
test('hash value should be on the screen', () => {
    render(
        <TxList
            currentList={mockData1.tx}
            showItemArr={[1]}
            showDetail={() => {}}
        />);
    const hash = screen.getByText('eb23 - 7c08');
    expect(hash).toBeInTheDocument();
});

test('btc amount value should be on the screen', () => {
    render(
        <TxList
            currentList={mockData1.tx}
            showItemArr={[1]}
            showDetail={() => { }}
        />);
    const amount = screen.getByText('$685');
    expect(amount).toBeInTheDocument();
});

test('Fee value should be on the screen', () => {
    render(
        <TxList
            currentList={mockData1.tx}
            showItemArr={[1]}
            showDetail={() => { }}
        />);
    const fee = screen.getByText('77.7k Sats');
    expect(fee).toBeInTheDocument();
});

test('button should be clickable', () => {
    let toggle = false;
    render(
        <TxList
            currentList={mockData1.tx}
            showItemArr={[1]}
            showDetail={() => { toggle = true}}
        />);
    fireEvent.click(screen.getByRole('img'));
    expect(toggle).toBe(true);
});
/********************************** */

/* 测试txList 组件 */
test('From value should be on the screen', () => {
    render(
        <TxDetail
            detailData={mockData1.tx[0]}
        />);
    const fromValue = screen.getByText('0.55157032 BTC');
    expect(fromValue).toBeInTheDocument();
});

test('To value should be on the screen', () => {
    render(
        <TxDetail
            detailData={mockData1.tx[0]}
        />);
    const toValue = screen.getByText('0.03608962 BTC');
    expect(toValue).toBeInTheDocument();
});
/********************************** */
