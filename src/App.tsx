import { ConnectWallet, useAddress, useContract, useContractRead, useWallet } from "@thirdweb-dev/react";
import "./styles/Home.css";
import { Row, Col, Space, Layout, Watermark, Modal } from "antd";
// import { useEffect, useState } from "react";
// import { ethers } from "ethers";
import InfoBox from "./components/InfoBox"
import ReferralBox from "./components/ReferralBox";
import FuncBox from "./components/FuncBox";
import { Content, Footer } from "antd/es/layout/layout";
import queryString from "query-string";
import { useEffect, useState } from "react";

const info = () => {
  Modal.info({
    title: 'Creators Contest',
    content: (
      <div>
        <p>Win a juicy BNB price pool without the need of a huge following!</p>
        <p>For who is this competition?</p>
        <p>For anyone who has a social following on Tiktok, Youtube, Twitter, Reddit,.... Small to medium sized accounts. This is for all of us.</p>
        <p>We will have different measures in place to value your content individually depending on many KPIs such as views, comments, likes, post quality and quantity.</p>
        <p>Competition Details & Rules:</p>
        <p>• Put our website link (https://pizzabnb.live/) in your post, bio or clearly mention it in the video, otherwise your post will not be valued.</p>
        <p>• Submit your material to https://t.me/BAKEDPIZZADAILY on TG</p>
        <p>• Post as many times as you wish to increase your chances to win. Not only the quality counts, but also the quantity.</p>
      </div>
    ),
    onOk() {},
  });
};

export default function Home() {

  const [countA, setCountA] = useState(1);
  const  CONTRACT_ADDR = "0x101d34c712ff8109d5CDc1f2983473A5C44a0B96"
  const SC_URL = "https://bscscan.com/address/"+CONTRACT_ADDR
  const TWITTER_URL = "https://x.com/bakedpizza8"
  const TG_URL = "https://t.me/BAKEDPIZZADAILY"
  const { contract } = useContract(CONTRACT_ADDR)
  // const { data: tvlBalance } = useContractRead(contract, "getBalance")
  // let { data: myEggs } = useContractRead(contract, "getMyEggs")
  // const formatTvlBalance = tvlBalance?ethers.utils.formatEther(tvlBalance.toString()):"0"
  
  // const [tvl, setTvl] = useState(0.0);
  // const [walletBalance, setWalletBalance] = useState(0.0);
  // const [enterValue, setEnterValue]=useState("");
  // const [pizza, setPizza] = useState("0");
  // const [refLink, setRefLink] = useState("")
  const wallet = useWallet()
  let address = useAddress()
  // const {data : myEggs} = useContractRead(contract, "getEggsSinceLastHatch", [address])
  const {data : myReferrer} = useContractRead(contract, "referrals", [address])
  
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);
 


  useEffect(()=>{
    const timer = setInterval(() => {
      setCountA(countA+1)
      console.log("count",countA)
      // address = useAddress()
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, [])
  // useEffect(()=>{
  //   // setRefLink(window.location?.toString()+"?ref="+address)
  //   // console.log("ref link",refLink)
  //   // address = useAddress()
  //   wallet?.getBalance()
  //     .then(
  //       (result)=>setWalletBalance(parseFloat(result.displayValue))
  //     )
  //     .catch(
  //       (reason)=>(console.log("Error",reason))
  //     )
  //     console.log("pizza2", myEggs)
  //     setPizza(myEggs?myEggs:"0")
  // },[contract, tvlBalance, myEggs, wallet])
  const parsed = queryString.parse(window.location.search);
  const ref = parsed.ref===undefined?'0x0000000000000000000000000000000000000000':parsed.ref;
  console.log("ref", ref);

  return (
    <Layout className="container">  
      <div className="header">
        <span>
          <a className="nav-item" href="https://bakedpizza.app/docs/whitepaper.pdf" target="_blank">WHITEPAPER</a>
        </span>
        <span>
          <img width={'300px'} src = "/images/pizza_logo.png"></img>
        </span>
        <span>
          <ConnectWallet  modalSize="compact"/>
        </span>
      </div>
      <h1 className="slogan">
        The BNB Pool with the finest daily 
        <br />
        return and highest referral reward
      </h1>
      <Content className="container"  >
          
        <Row gutter={[16,16]} justify="center" >
          <Col xs={24} sm={24} md={24} lg={12} xl={10} xxl={8}>
              <FuncBox 
                count = {countA}
                contract = {contract} 
                wallet = {wallet} 
                address={address} 
                contractAddress={CONTRACT_ADDR}
                myReferrer={(myReferrer===undefined)||myReferrer.startsWith('0x0000')?ref:myReferrer}
              ></FuncBox>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={10} xxl={8}>
              <ReferralBox address={address} myReferrer={(myReferrer===undefined)||myReferrer.startsWith('0x0000')?ref:myReferrer}></ReferralBox>
              <Space> </Space>
              <InfoBox></InfoBox>
          </Col>
        </Row>
      </Content>
      <div className="footer">
          <a className="nav-item" href="https://bakedpizza.app/docs/whitepaper.pdf" target="_blank"  rel="noopener noreferrer">WHITEPAPER</a>
          <a className="nav-item" href="https://hazecrypto.net/audit/Baked_Pizza" target="_blank" rel="noopener noreferrer">
                                AUDIT REPORT
          </a>
          {/* <a className="nav-item" onClick={info}>Creators Contest</a> */}
        </div>
        <div className="footer socialMedias">
          <a href={SC_URL} target="_blank" rel="noopener noreferrer">
            <img src="/images/bscscan.png" />
          </a>
          <a href={TWITTER_URL} target="_blank" rel="noopener noreferrer">
            <img src="/images/twitter.png" />
          </a>
          <a href={TG_URL} target="_blank" rel="noopener noreferrer">
            <img src="/images/tg.png" />
          </a>
      </div>
      
    </Layout>
    
  );
}
