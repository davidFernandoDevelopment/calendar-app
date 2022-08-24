import { ChangeEvent, FocusEvent, useEffect, useMemo, useState } from 'react';

export type FormValidation<T> = {
	[key in keyof T]: [(...args: any[]) => boolean, string];
};
type FormResult<T> = {
	[key in keyof T as `${string & key}Valid`]: string | null;
};
type FormVerify<T> = { [key in keyof T]: boolean };

export const useForm = <T, U extends keyof T = keyof T>(
	initialForm: T,
	formValidations?: FormValidation<T>
) => {
	const [formState, setFormState] = useState<T>(initialForm);
	const [formValidation, setFormValidation] = useState<FormResult<T>>(
		{} as FormResult<T>
	);
	const [touched, setTouched] = useState<FormVerify<T>>({} as FormVerify<T>);

	const isFormValid = useMemo(() => {
		for (const formValue of Object.keys(formValidation)) {
			if (formValidation[formValue as keyof FormResult<T>] !== null)
				return false;
		}

		return true;
	}, [formValidation]);

	useEffect(() => {
		createValidators();
		//eslint-disable-next-line
	}, [formState]);

	useEffect(() => {
		setFormState(initialForm);
	}, [initialForm]);

	const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	const onBlur = (e: FocusEvent<HTMLInputElement>) => {
		const { name } = e.target;
		setTouched({
			...touched,
			[name]: true,
		});
	};

	const checkAllTouched = () => {
		let result: FormVerify<T> = {} as FormVerify<T>;
		if (formState) {
			for (const iterator of Object.keys(formState)) {
				result = {
					...result,
					[iterator]: true,
				};
			}
			setTouched(result);
		}
	};

	const onResetForm = () => {
		setFormState(initialForm);
	};

	const createValidators = () => {
		const formCheckValues: any = {};
		if (formValidations) {
			for (const formField of Object.keys(formValidations)) {
				let newProp: U = formField as U;
				const [fn, errorMessage] = formValidations[newProp];
				formCheckValues[`${formField}Valid`] = fn(formState[newProp])
					? null
					: errorMessage;
			}
			setFormValidation(formCheckValues);
		}
	};

	return {
		...formState,
		...formValidation,
		touched,
		checkAllTouched,
		isFormValid,
		formState,
		onInputChange,
		onResetForm,
		onBlur,
	};
};
