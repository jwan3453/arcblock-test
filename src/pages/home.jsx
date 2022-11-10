
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import React, { useState, useEffect, useRef, CSSProperties} from 'react';
import '../app.css'

import BlockInfo from '../components/blockInfo';
import DotLoader from "react-spinners/DotLoader";
import TxList from '../components/txList';
import toast, { Toaster } from 'react-hot-toast';

const ApiPrefix = 'https://blockchain.info/rawblock/';

// 设置一个默认的hash
const defaultHash = '000000000000000000026aa8da7290471207a94c10b6ee0ddd930b5ef22e2e3e';

// 每页数据的数量
const PerPage = 16; 


function Home() {

  const [blockData, setBlockData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [showItemArr, setShowItemArr] = useState([]);
  const inputRef = useRef(null);
  let [loading, setLoading] = useState(false);

  //  api 获取数据
  const fetchData = async (hash) => {
    try {
      setLoading(true);
      let res = await axios.get(`${ApiPrefix}${hash}`).catch(err => {
        toast.error('无法找到区块，请重新输入hash。')
        setLoading(false);
      });
      setLoading(false);
      if (res && res.data) {
        let { tx } = res.data;

        // 给tx列表添加原始的index
        if (tx) {
          tx.forEach((item, index) => {
            item.originIndex = index;
          })
          res.data.tx = tx;
        }

        setBlockData(res.data);
        if (tx && tx.length) {
          setPages(tx.length / PerPage);
        }
      }

    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData(defaultHash);
  }, []);

  const {
    tx,
  } = blockData || {};

  const handlePageClick = (event) => {
    let page = event.selected;
    setCurrentPage(page);
    setShowItemArr([]);
  }

  const showDetail = (itemIndex) => {
    const index = showItemArr.indexOf(itemIndex);
    if (index > -1) { 
      setShowItemArr(showItemArr.filter((item) => item !== itemIndex)); 
    } else {
      setShowItemArr([...showItemArr, itemIndex]);
    }
  }

  const searchHash = () => {
    fetchData(inputRef.current.value);
  }

  let currentList = [];
  if (tx && tx.length) {
    currentList = tx.slice(currentPage * PerPage, (currentPage + 1) * PerPage)
  }

  return (

    <div>
      <div className='pageHeader'>BTC Block Data Search Engine</div>
      <div className='query-block'>
        <input placeholder='enter hash to search' ref={inputRef} />
        <div className='searchBtn' id='searchBtn' onClick={searchHash}>Search</div>
      </div>  
      <BlockInfo blockData={blockData}/>
      <TxList
        currentList={currentList}
        showItemArr={showItemArr}
        showDetail={showDetail}
      />
      {
        tx &&
        <div className='paginationBlock'>
          <ReactPaginate
            previousLabel={'prev'}
            nextLabel={'next'}
            pageCount={pages}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}

          />
        </div>
      }
      <div className='loadingSpin'>
        <DotLoader
          color={'#6c7ac9'}
          loading={loading}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
          />
      </div>
      <Toaster />
    </div>
  );
}

export default Home;
