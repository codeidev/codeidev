'use client'

import React, { useEffect, useRef, useState } from 'react'
import Loading from '../../components/loading';
import Web3 from 'web3';
const abiUSDT = require("./abiUSDT.json");
const abiXON = require("./abiXON.json");
const abiBNB = require("./abiBNB.json");

const CheckbalanceBscscan = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState([]);

    // tạo biến message để hiển thị thông báo
    const arrMessage = []

    const handleSubmit = async (e) => {
        e.preventDefault()
        let listAddress = []
        // lấy dữ liệu từ form
        const {
            token: { value: token },
            privateKey: { value: privateKey },
            fromAddress: { value: fromAddress }
        } = e.currentTarget;

        // cắt chuỗi để lấy mảng các address
        listAddress = Array.from(new Set(e.currentTarget.input.value.split('\n')))

        const abi = [{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint256","name":"totalSupply_","type":"uint256"},{"internalType":"address","name":"router_","type":"address"},{"internalType":"address","name":"charityAddress_","type":"address"},{"internalType":"uint16","name":"taxFeeBps_","type":"uint16"},{"internalType":"uint16","name":"liquidityFeeBps_","type":"uint16"},{"internalType":"uint16","name":"charityFeeBps_","type":"uint16"},{"internalType":"address","name":"serviceFeeReceiver_","type":"address"},{"internalType":"uint256","name":"serviceFee_","type":"uint256"}],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"minTokensBeforeSwap","type":"uint256"}],"name":"MinTokensBeforeSwapUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokensSwapped","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ethReceived","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensIntoLiqudity","type":"uint256"}],"name":"SwapAndLiquify","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"enabled","type":"bool"}],"name":"SwapAndLiquifyEnabledUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"enum TokenType","name":"tokenType","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"version","type":"uint256"}],"name":"TokenCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"VERSION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_charityAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_charityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_liquidityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_taxFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tAmount","type":"uint256"}],"name":"deliver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"excludeFromFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"excludeFromReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"includeInFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"includeInReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isExcludedFromFee","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isExcludedFromReward","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tAmount","type":"uint256"},{"internalType":"bool","name":"deductTransferFee","type":"bool"}],"name":"reflectionFromToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"liquidityFeeBps","type":"uint256"}],"name":"setLiquidityFeePercent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_enabled","type":"bool"}],"name":"setSwapAndLiquifyEnabled","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"taxFeeBps","type":"uint256"}],"name":"setTaxFeePercent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swapAndLiquifyEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"rAmount","type":"uint256"}],"name":"tokenFromReflection","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uniswapV2Pair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswapV2Router","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}]

        // khởi tạo web3
        // const Web3 = require('web3');
        // const web3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed1.binance.org:443'));
        const { Web3 } = require('web3');
        // const web3 = new Web3(new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545'));


        // Thay thế bằng URL của node RPC
        const web3 = new Web3(window.ethereum);

        // // Yêu cầu người dùng kết nối ví
        await window.ethereum.enable();

        // // Địa chỉ hợp đồng token
        const tokenContractAddress = '0xea541ecf63997c88BE94deA793F59f6e278A8BE3';

        // // Khởi tạo hợp đồng
        const tokenContract = new web3.eth.Contract(abi, tokenContractAddress); // abi là ABI của hợp đồng token

        const gasPrice = await web3.eth.getGasPrice()

        // Tạo giao dịch
        const tx = {
        from: '0xea541ecf63997c88BE94deA793F59f6e278A8BE3', // Địa chỉ ví người gửi
        to: '0xF9a1Db0d6f22Bd78ffAECCbc8F47c83Df9FBdbCf', // Địa chỉ ví người nhận
        value: web3.utils.toWei('0.00087', 'ether'), // Số lượng token
        gas : 21000,
        gasPrice : gasPrice
        // ... các thông số khác
        };

        // Ký giao dịch
        const signedTx = await web3.eth.accounts.signTransaction(tx, 'f97dec7383d8fde6a90a8036378d8730a0981293141d120692ba1362c6391760'); // private key của người dùng

        // Gửi giao dịch
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log(receipt);

        
        // gán abi token phù hợp với token
        // const abiToken = token == '0x55d398326f99059ff775485246999027b3197955' ? abiUSDT : token == '0xF422bB9B57FB0ea0245A876aDB4b06D2f2eEdC7E' ? abiXON : '0x78ac6d3bc040edA72A5AfBB52837413A1Bc5bA1a'


        // console.log(listAddress); //list ds vi gui di 

        // console.log(fromAddress); //dia chi vi di

        // console.log(privateKey); //dia chi vi cua minh 

        // console.log(token); //the loai dong tien 

        // console.log(web3.eth.getGasPrice());


        // const toAddress = '0x53387F3321FD69d1E030BB921230dFb188826AFF';
        // const amount = web3.utils.toWei('0.000063', 'ether');

        // const nonce = await web3.eth.getTransactionCount('0xea541ecf63997c88BE94deA793F59f6e278A8BE3', 'latest');
        // const gasPrice = await web3.eth.getGasPrice();
        // const transaction = {
        //     to: toAddress,
        //     value: amount,
        //     gas: 21000,  // Typical gas limit for BNB transfer
        //     gasPrice: gasPrice,
        //     nonce: nonce
        // };
        
        // const signedTx = await web3.eth.accounts.signTransaction(transaction, "f97dec7383d8fde6a90a8036378d8730a0981293141d120692ba1362c6391760");
        // const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        // console.log('Transaction receipt:', receipt);
        // // chạy vòng lặp để gửi tiền
        // for (let i = 0; i < listAddress.length; i++) {
        //     setIsLoading(true)
        //     setMessage([])
        //     const address = listAddress[i].split(',');
        //     // address[0] là địa chỉ nhận, address[1] là số tiền
        //     const toaddress = address[0].replace(/\s/g, '')
        //     const amount = address[1].replace(/\s+/g, '')
        //     try {
        //         if (token == "BNB") {
        //             const gasPrice = await web3.eth.getGasPrice()
        //             const nonce = await web3.eth.getTransactionCount(fromAddress)
        //             let signTransaction = await web3.eth.accounts.signTransaction({
        //                 to: toaddress, // địa chỉ nhận
        //                 value: web3.utils.toWei(amount, 'ether'),
        //                 gas: 21000,
        //                 gasPrice: gasPrice,
        //                 nonce: nonce,
        //             }, privateKey);
        //             let tx = await web3.eth.sendSignedTransaction(signTransaction.rawTransaction)
        //             if (tx.status.toString() == '1') {
        //                 arrMessage.push({ address: address[0], status: "Tranfer success" })
        //                 console.log({ address: toaddress, status: "Tranfer success" });
        //             } else {
        //                 arrMessage.push({ address: address[0], status: "Tranfer error" })
        //                 console.log({ address: address[0], status: "Tranfer error" });
        //             }
        //         } else {
        //             // contract instance

        //             const contract = await new web3.eth.Contract(abiToken, token);
        //             const decimals = await contract.methods.decimals().call();
        //             // transfer event abi
        //             const transferAbi = await contract.methods.transfer(toaddress, (amount * 10 ** Number(decimals)).toString()).encodeABI();

        //             const gasPrice = await web3.eth.getGasPrice()
        //             const nonce = await web3.eth.getTransactionCount(fromAddress)
        //             let signTransaction = await web3.eth.accounts.signTransaction({
        //                 from: fromAddress,
        //                 to: token,
        //                 data: transferAbi,
        //                 value: 0,
        //                 gas: 100000,
        //                 gasPrice: gasPrice,
        //                 nonce: nonce,
        //             }, privateKey);
        //             let tx = await web3.eth.sendSignedTransaction(signTransaction.rawTransaction)
        //             if (tx.status.toString() == '1') {
        //                 arrMessage.push({ address: toaddress, status: "Tranfer success" })
        //                 console.log({ address: toaddress, status: "Tranfer success" });
        //             } else {
        //                 arrMessage.push({ address: address[0], status: "Tranfer error" })
        //                 console.log({ address: address[0], status: "Tranfer error" });
        //             }
        //         }
        //     }
        //     catch (error) {
        //         console.log('error', error);
        //     }
        // }
        // setMessage(arrMessage)
        // setIsLoading(false)

        // const web3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed1.binance.org:443'));

        // const tokenContractAddress = '0x765aDd1Cb9Ac9813aCcae2232CB04B2F42c092c0';

        // const tokenContract = new web3.eth.Contract(abiXON, tokenContractAddress); // abi là ABI của hợp đồng token

        // const gasPrice = await web3.eth.getGasPrice();

        // const toAddress = 'TAzsQ9Gx8eqFNFSKbeXrbi45CuVPHzA8wr';
        // const amount = web3.utils.toWei('0.000063', 'ether');

        // const nonce = await web3.eth.getTransactionCount('0x765aDd1Cb9Ac9813aCcae2232CB04B2F42c092c0', 'latest');
        // const transaction = {
        //     to: toAddress,
        //     value: amount,
        //     gas: 21000,  // Typical gas limit for BNB transfer
        //     gasPrice: gasPrice,
        //     nonce: nonce
        // };
        
        // const signedTx = await web3.eth.accounts.signTransaction(transaction, "6b920b2c5235d1549b6af08a567b24f3cdd52a0ec2e8a77af24b0e0a7aeefab4");
        // const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        // console.log('Transaction receipt:', receipt);
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-3xl mb-8 mt-2 font-bold uppercase text-white'>BSCSCAN Multiple Transfer</h1>
            <form className=' items-center p-16 pt-4 pb-0 flex justify-start flex-col w-full px-48' onSubmit={handleSubmit}>
                {/* input private key */}
                <div className='my-8 grid grid-cols-3 items-center w-full'>
                    <label htmlFor='privateKey' className='col-span-1 text-white text-lg'> Private Key Your Address</label>
                    {/* <input className=' p-2 border-4 col-span-2' name='privateKey' required onChange={(e) => { setPrivateKey(e.target.value) }} /> */}
                    <input className=' p-2 border-4 col-span-2  rounded-[15px]' name='privateKey' required />
                </div>
                {/* input fromAddress */}
                <div className='my-8 grid grid-cols-3 items-center w-full'>
                    <label htmlFor='fromAddress' className='col-span-1 text-white text-lg'> Enter Your Address</label>
                    <input className=' p-2 border-4 col-span-2 rounded-[15px]' name='fromAddress' required />
                </div>
                <div className='my-8 grid grid-cols-3 items-center w-full'>
                    <label htmlFor='token' className='text-white text-lg'>
                        Token
                    </label>
                    <select className=' p-2 border-4 rounded-[15px]' name='token' required>
                        <option value='BNB' defaultValue='selected'>
                            BNB
                        </option>
                        <option value="0x55d398326f99059ff775485246999027b3197955">USDT</option>
                        <option value="0xF422bB9B57FB0ea0245A876aDB4b06D2f2eEdC7E">XON</option>
                    </select>
                </div>
                <div className='my-8 grid grid-cols-3 items-center w-full'>
                    <label htmlFor='input' className='col-span-1 text-white text-lg'> Enter list address to</label>
                    <textarea rows="10" cols="50" className='border-4 border-gray-400 col-span-2 rounded-[15px]' spellCheck="true" name='input' placeholder='ex: 0x033203B40FFE6443E68983542e561f77031F645a, 0.002' />
                </div>
                <button type="submit" className='my-8 border-2 border-blue-500 py-3 px-6 bg-blue-400 text-white rounded-xl text-lg' > Submit</button >
            </form >
            <div>
                {isLoading ? <Loading /> : null}
            </div>
            <div>
                <div className='bg-[#390176]'>
                    {message.map((item, index) => {
                        return (
                            <div key={index} className='text-xl  flex text-white'>
                                <p className='text-white'>{item.address}</p>
                                <p className={`ml-4 font-bold text-white ${item.status === "Tranfer success" ? "text-green-600" : "text-red-600"}`}>{item.status}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div >
    )

}

export default CheckbalanceBscscan