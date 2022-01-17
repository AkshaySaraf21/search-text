import styles from './user-details.module.scss';


const UserDetail = ({ id, address, items, pincode, name }) => {


    return <table className={styles.table}>
        <tr>
            <td>ID</td>
            <td>{id}</td>
        </tr>
        <tr>
            <td>Name</td>
            <td>{name}</td>
        </tr>
        <tr>
            <td>Items</td>
            <td>{items?.join(',')}</td>
        </tr>
        <tr>
            <td>Address</td>
            <td>{address}</td>
        </tr>
        <tr>
            <td>Pincode</td>
            <td>{pincode}</td>
        </tr>



    </table>

};


export default UserDetail;