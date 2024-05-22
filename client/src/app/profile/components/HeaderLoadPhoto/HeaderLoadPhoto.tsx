import styles from './styles.module.scss';
import PhotoSvg from '@/assets/icons/photo.svg';

interface HeaderLoadPhotoProps {
    title: string;
    text: string;
}

export default function HeaderLoadPhoto({ title, text }: HeaderLoadPhotoProps) {
    return (
        <div className={styles.container}>
            <label htmlFor="photo" className={styles.btn}>
                <PhotoSvg/>
                <input type="file" id="photo" name="photo" accept="image/png, image/jpeg" className={styles.input}/>
            </label>
            <span className={styles.title}>{title}</span>
            <span className={styles.text}>{text}</span>
        </div>
    );
}