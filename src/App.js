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

  useEffect(() => {
    async function loadWeb3() {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          setWeb3(web3);
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);
          setIsConnected(true);
        } catch (error) {
          console.error(error);
        }
      }
    }

    loadWeb3();
  }, []);

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
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Not install Metamask! Please install wallet");
    }
  };

  const disconnectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_logout' });
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
            <p>Đã kết nối với tài khoản: {account}</p>
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
