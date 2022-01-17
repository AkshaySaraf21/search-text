import styles from './dropdown-item.module.scss'


const DropdownItem = ({ id, name, address }) => (
    <div className={styles.container}>
        <div className={styles.id}>{id}</div>
        <div className={styles.name}>{name}</div>
        <div className={styles.address}>{address}</div>
    </div>
);


export default DropdownItem;