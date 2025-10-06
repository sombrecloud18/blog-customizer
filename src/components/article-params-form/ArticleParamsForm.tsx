import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef } from 'react';
import { Text } from '../../ui/text/Text';
import { Select } from '../../ui/select/Select';
import { RadioGroup } from '../../ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOverlayClick } from 'src/hooks/useOverlayClick';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import {
	fontFamilyOptions,
	ArticleStateType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';

interface ArticleParamsFormProps {
	pageState: ArticleStateType;
	onApply: (newState: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	pageState,
	onApply,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [value, setValue] = useState<ArticleStateType>(pageState);
	const formRef = useRef<HTMLElement>(null);
	const toggleOpen = () => {
		setIsOpen((prev) => !prev);
	};
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(value);
		setIsOpen(false);
	};
	useOverlayClick({
		isOpen,
		rootRef: formRef,
		onChange: setIsOpen,
	});
	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(defaultArticleState);
		setValue(defaultArticleState);
	};
	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					toggleOpen();
				}}
			/>
			<aside
				ref={formRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					onSubmit={handleSubmit}
					onReset={handleReset}
					className={styles.form}>
					<Text
						as='h2'
						size={31}
						weight={800}
						family='open-sans'
						uppercase
						dynamicLite>
						Задайте параметры
					</Text>
					<Select
						selected={value.fontFamilyOption}
						title='шрифт'
						options={fontFamilyOptions}
						onChange={(option) => {
							setValue((prev) => ({ ...prev, fontFamilyOption: option }));
						}}></Select>
					<RadioGroup
						name='fontSize'
						title='размер шрифта'
						options={fontSizeOptions}
						selected={value.fontSizeOption}
						onChange={(option) => {
							setValue((prev) => ({ ...prev, fontSizeOption: option }));
						}}></RadioGroup>
					<Select
						selected={value.fontColor}
						title='цвет шрифта'
						options={fontColors}
						onChange={(option) => {
							setValue((prev) => ({ ...prev, fontColor: option }));
						}}></Select>
					<Separator></Separator>
					<Select
						selected={value.backgroundColor}
						title='цвет фона'
						options={backgroundColors}
						onChange={(option) => {
							setValue((prev) => ({ ...prev, backgroundColor: option }));
						}}></Select>
					<Select
						selected={value.contentWidth}
						title='ширина контента'
						options={contentWidthArr}
						onChange={(option) => {
							setValue((prev) => ({ ...prev, contentWidth: option }));
						}}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
