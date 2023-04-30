import "../index.css";
import Cart from "../components/cart/Cart";
import Sidebar from "../components/Sidebar";
import TransactionContent from "../components/transaction/TransactionContent";

function TransactionsPage() {
  return (
    <div
      className="
 flex
    "
    >
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-7/12">
        <TransactionContent />
      </div>
      <div className="w-1/4">
        <Cart />
      </div>
    </div>
  );
}

export default TransactionsPage;
