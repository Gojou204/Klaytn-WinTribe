import React, { useEffect, useState } from 'react';
import './App.css';
import Web3 from 'web3';

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [licenseData, setLicenseData] = useState({
    licenseNumber: '',
    name: '',
    date: '',
    national: '',
    address: '',
  });

  useEffect(() =>{
    getCurrentWalletConnected();
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLicenseData({ ...licenseData, [name]: value });
  };

  const connectWallet = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setIsConnected(true);
        console.log(accounts[0]);
      } catch (error) {
        console.error(error.message);
      }
    } else {
      alert("Not install Metamask! Please install Metamask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if(accounts.length >0){
          setAccount(accounts[0]);
          setIsConnected(true);
          console.log(accounts[0]);
        }else{
          console.log("Connect to Metamask using the Connect Button");
        }
        
      } catch (error) {
        console.error(error.message);
      }
    } else {
      alert("Not install Metamask! Please install Metamask");
    }
  };

  const disconnectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_disconnect' });
        setAccount('');
        setIsConnected(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const submitLicenseData = async () => {
    if (!web3) {
      alert('Vui lòng kết nối ví của bạn');
      return;
    }

    // Tại đây, bạn có thể tương tác với smart contract của mình bằng cách sử dụng web3
    // Ví dụ:
    // const contract = new web3.eth.Contract(abiCuaContract, diaChiContract);
    // const result = await contract.methods.phuongThucCuaBan(thamSo).send({ from: account });

    // Hãy nhớ xử lý giao dịch, lỗi và cập nhật trạng thái một cách phù hợp
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Xác thực Giấy phép lái xe</h1>
        {isConnected ? (
          <div>
            <p>Đã kết nối với tài khoản: {account.substring(0,8)}....{account.substring(37)}</p>
            <button onClick={disconnectWallet}>Ngắt kết nối</button>
          </div>
        ) : (
          <div>
            <button onClick={connectWallet}>Kết nối ví MetaMask</button>
            <p>Vui lòng kết nối ví của bạn để tiếp tục</p>
          </div>
        )}
        {isConnected && (
          <div>
            <form>
              <label>
                Số giấy phép/No:
                <input
                  type="text"
                  name="licenseNumber"
                  value={licenseData.licenseNumber}
                  onChange={handleChange}
                />
              </label>
              <label>
                Họ tên/Full name:
                <input
                  type="text"
                  name="name"
                  value={licenseData.name}
                  onChange={handleChange}
                />
              </label>
              <label>
                Ngày sinh/Date of Birth:
                <input
                  type="text"
                  name="date"
                  value={licenseData.date}
                  onChange={handleChange}
                />
              </label>
              <label>
                Quốc tịch/Nationality:
                <input
                  type="text"
                  name="national"
                  value={licenseData.national}
                  onChange={handleChange}
                />
              </label>
              <label>
                Nơi cư trú/Address:
                <input
                  type="text"
                  name="address"
                  value={licenseData.address}
                  onChange={handleChange}
                />
              </label>
            </form>
            <button onClick={submitLicenseData}>Xác thực Giấy phép lái xe</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
