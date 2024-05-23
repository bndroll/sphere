import styles from './styles.module.scss';

interface ChipsProps {
    text: string
}

export default function Chip({ text }: ChipsProps) {
    return (
        <span className={styles.chip}>{text}</span>
    )
}