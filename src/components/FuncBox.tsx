import { SmartContract, WalletInstance, Web3Button, useContractRead } from '@thirdweb-dev/react'
import { Col, Divider, Input, InputNumber, Progress, Row, Space, message } from 'antd'
import Card from 'antd/es/card/Card'
import { ethers } from 'ethers';
import React, { ChangeEventHandler, useEffect, useState } from 'react'

export default function FuncBox(props: any) {
    const contract : SmartContract = props.contract;
    const wallet : WalletInstance = props.wallet;
    const myReferrer:string = props.myReferrer
    // const address = props.address
    const contractAddress = props.contractAddress;
    const { data: tvlBalance } = useContractRead(contract, "getBalance")
    const { data : myMiners} = useContractRead(contract, "hatcheryMiners", [props.address])
    const { data : myEggs} = useContractRead(contract, "getEggsSinceLastHatch" ,[props.address])
    const { data : myRewards} = useContractRead(contract, "calculateEggSell", [myEggs])
    const formatTvlBalance = tvlBalance?ethers.utils.formatEther(tvlBalance.toString()):"0"
    const formatMyRewards = myRewards?ethers.utils.formatEther(myRewards.toString()):"0"

    const numTvlBalance = Number(formatTvlBalance).toFixed(10);
    const numMyRewards = Number(formatMyRewards).toFixed(10);
    const [walletBalance, setWalletBalance] = useState("");
    // const [enterValue, setEnterValue]=useState("");
    const [pizza, setPizza] = useState("0");
    const [value, setValue] = useState("0.01");
    
    const handleChange = (val: string) => {
        console.log("before",val)
        val = val.replace(/[a-zA-Z]*/g , '');
        console.log("after",val)
        console.log("Number",Number(val));
        if (isNaN(Number(val))){
            setValue("0");
            message.error("Input not valid!")
        }else{
            if(val===""){
                setValue("0");    
            }else{
                if (val.includes(".")){
                    setValue(val)
                }else{
                   setValue(Number(val).toString());
                }
            }
        }
    }
    
    
    useEffect(()=>{
        wallet?.getBalance()
        .then(
          (result)=>setWalletBalance(parseFloat(result.displayValue).toFixed(10))
        )
        .catch(
          (reason)=>(message.error(reason))
        )
        setPizza(myEggs?myEggs:"0")
    },[props])
  return (
    <Card className="card">
        <Row>
            <Col span={24}>
                <span className="itemtitle">Contract</span>
                <span className="itemvalue">{numTvlBalance==="0.0000000000"?"0 BNB":numTvlBalance+" BNB"}</span>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <span className="itemtitle">Wallet</span>
                <span className="itemvalue">{walletBalance==="0.0000000000"?"0 BNB":walletBalance+" BNB"}</span>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <span className="itemtitle">Your Miners</span>
                <span className="itemvalue">{myMiners===undefined?"0":myMiners+" miners"} </span>
            </Col>
        </Row>
        <Row gutter={[16,16]}>
            {/* <Col span={24}>
            <input style={{width: '100%', height: '3rem', textAlign:"center", fontSize: '1.5rem', borderRadius: '30px', }}></input>
            </Col> */}
            <Col span={24}>
                <Input
                    value={value}
                    onChange={e => handleChange(e.target.value)}
                    suffix="BNB"
                    styles={{affixWrapper:{ fontWeight:'bold', color:'#fff', backgroundColor: '#F8C34E',  borderRadius: '30px', borderWidth: '5px' } ,input:{fontWeight:'bold', color:'#fff', backgroundColor: '#F8C34E', width: '100%', height: '3rem', textAlign:"center", fontSize: '1.5rem' }, suffix:{ fontSize: '1.5rem' } }}
                ></Input>
            </Col>
            <Col span={24}> 
            {/* <InputNumber className='input'
                size="large"
                style ={{ width: '100%', height: '3rem', fontSize: '1.5rem' , borderRadius: '30px'}}
                value="0.01"
                suffix="BNB" 
                onChange={(value)=>{
                console.log("input",value)
                setEnterValue(value?value.toString():"0")
                }}  
            /> */}
            </Col>
            <Col span={24}>
                <Web3Button className="btn"
                    style={{  width: '100%', fontSize: '1.2rem', borderRadius: '30px', fontWeight:'bold'
                }}
                    contractAddress={contractAddress}
                    action={async ()=>{
                        await contract?.call("bakePizza",[myReferrer],{
                        value: ethers.utils.parseEther(value)
                        })
                    }}
                    onSuccess={()=>{
                        setValue("0.01")
                        message.success("BAKE Pizza Success!")
                    }}
                    onError={(error)=>{
                        setValue("0.01")
                        message.error(error.message)
                    }}
                    >BAKE Pizza
                </Web3Button>
            </Col>
        </Row>
        {/* <Space> </Space> */}
        <Divider className='divider' style={{ borderColor:'#fff', color: '#fff', fontSize: '1.5rem'}}>Rewards</Divider>
        <Row>
            <Col span={24}>
                <span className="itemtitle">Your Pizza</span>
                <span className="itemvalue">{pizza+" Pizza"} </span>
            </Col>
        </Row>
        <Row><Col span={24}> 
        <span className='itemtitle'>Your Rewards</span>
        <span className='itemvalue'>{numMyRewards==="0.0000000000"?"0 BNB":numMyRewards + " BNB"}</span>
        
        </Col>
        <Col span={24}>
            <Row justify="space-between" gutter={16}>
                <Col span={12}>
                <Web3Button className="btn"
                    style={{ width: '100%', fontSize: '1rem', borderRadius: '30px', fontWeight:'bold'
                }}
                    contractAddress={contractAddress}
                    action={async ()=>{
                        await contract?.call("rebakePizza",[myReferrer],{})
                    }}
                    onSuccess={()=>{
                        setValue("0.01")
                        message.success('RE-BAKE Pizza Sucess!')
                    }}
                    onError={(error)=>{
                        setValue("0.01")
                        message.error(error.message)
                    }}
                    >RE-BAKE Pizza
                </Web3Button>
                </Col>
                <Col span={12}>
                <Web3Button className="btn"
                    style={{width:'100%', fontSize: '1rem', borderRadius: '30px', fontWeight:'bold'
                }}
                    contractAddress={contractAddress}
                    action={async ()=>{
                        await contract?.call("eatPizza",[],{})
                    }}
                    onSuccess={()=>{
                        setValue("0.01")
                        message.success('EAT Pizza Sucess!')
                    }}
                    onError={(error)=>{
                        setValue("0.01")
                        message.error(error.message)
                    }}
                    >EAT Pizza
                </Web3Button>
                </Col>
                </Row>
            </Col>
        </Row>
    </Card>
  )
}
