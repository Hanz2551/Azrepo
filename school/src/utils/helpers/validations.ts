import { TSchema, TValuesValidation } from '@/utils/types/global';
import _isEmpty from 'lodash/isEmpty';

export const getRequiredErrorMsg = (name: string) => `${name}は必須です`;

export const getMaxLengthErrorMsg = (name: string, max: number) =>
  `${name}は${max}文字以下で入力してください`;

export function validate<V extends TValuesValidation>(schema: TSchema<V>, values: V) {
  const result = Object.entries(schema).reduce(
    (errors, [name, rules]) => {
      const value = values[name];
      for (const rule of rules) {
        if (typeof value === 'string') {
          if (rule.required && !value.trim()) {
            errors[name as keyof V] = rule.message;
            break;
          }

          if (rule.maxLength && value.trim().length > rule.maxLength) {
            errors[name as keyof V] = rule.message;
            break;
          }
        } else if (typeof value === 'object') {
          if (rule.required && _isEmpty(value)) {
            errors[name as keyof V] = rule.message;
            break;
          }
        }
      }
      return errors;
    },
    {} as Record<keyof V, string>,
  );
  return _isEmpty(result) ? undefined : result;
}
