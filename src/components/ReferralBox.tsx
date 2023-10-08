import { Button, Col, Divider, Input, Row, Space, message } from 'antd'
import Card from 'antd/es/card/Card'
import React, { useEffect, useState } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'

export default function ReferralBox(props: any) {
  const [copyValue, copy] = useCopyToClipboard()
  const [refLink, setRefLink] = useState("")
  const address = props.address;
  const myReferrer = props.myReferrer;
  useEffect(()=>{
    setRefLink(window.location?.origin.toString()+"?ref="+address)
    console.log("ref link",refLink)
  },[props])

  return (
    <Card className='card'>
        <Row>
             <Col className = "boxtitle" style={{color: '#F8C34E'}} span={24}>Referral Link</Col>
        </Row>   
        <Row>
          <Col className = "description">Earn 15% of the BNB used to bake bread from anyone who uses your referral link</Col>
        </Row>   
        <Row justify='center'>
            <Col span={24}>
                  <Input className="btn" readOnly size="large" style={{width: 'calc(100% - 85px)', borderRadius: '30px' }}
                    value={refLink?.toString()}>
                  </Input>   
                  <Button className="btn"
                      size="large" style={{ fontWeight:'bold',width:'80px', fontSize: '1rem', borderRadius: '30px',   float: 'right'}}
                      onClick={()=>{
                      copy(refLink)
                      console.log("copyValue",copyValue)
                      message.success("Copy Referral Link")
                    }}>COPY</Button>
            </Col>
          </Row>
          <Divider className='divider' style={{ borderColor:'#fff', color: '#fff', fontSize: '1.5rem'}}></Divider>
        
          <div>
            <div className="itemtitle">My referrer</div>
            <Input className="btn" readOnly size="large" style={{width: '100%', borderRadius: '30px' }}
                    value={myReferrer}>
            </Input>
          </div>
    </Card>
  )
}
