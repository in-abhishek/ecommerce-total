import React, { useContext, useState } from 'react'
import TodoContext from '../ContextApi';
import { StarFill } from 'react-bootstrap-icons';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import './compare.css';
import { useNavigate } from 'react-router-dom';
const Compare = (props) => {
    const { showImage } = useContext(TodoContext);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const { compareData } = props;
    const removeSinglePage = () => {
        setShow(!show);
        navigate(`/`);
    }
    console.log("compareData->>>", compareData.length);
    if (compareData.length > 4) {
        return (
            <>
            <div className="single-page-cross" onClick={removeSinglePage}></div>
            <span className='showcompare'>please select only 4 product</span>
            </>
        )   
    }

return (
    <div className='compareProduct'>
        <div className="single-page-cross" onClick={removeSinglePage}></div>
        {compareData ?
            compareData.map((item, key) => {
                return (
                    <>
                        <div className={`single-compare single-compare-${key}`} key={key}>
                            <h2 className='cell'>Product {key + 1}</h2>
                            {item.images ?
                                <div className="cell">
                                    <img src={item?.category?.image} alt="" />
                                    {/* <img src={showImage(item.images[0])} alt="" /> */}
                                </div> : ''
                            }
                            {item.title ?
                                <div className="cell cell-title">
                                    <h3>{item.title}</h3>
                                </div> : ''
                            }
                            {item.price ?
                                <div className="cell">
                                    <h3>{item.price}</h3>
                                </div> : ''
                            }
                            <div className="cell">
                                <span><StarFill /> <StarFill /> <StarFill /></span>
                            </div>
                        </div>
                    </>
                )
            }) : <span>No Product Found</span>
        }
    </div>
)
}

export default Compare