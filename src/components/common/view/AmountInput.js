// @flow
import React, { useEffect, useState } from 'react'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import { isMobile } from 'mobile-device-detect'
import SectionTitle from '../layout/SectionTitle'
import InputGoodDollar from '../form/InputGoodDollar'
import { withStyles } from '../../../lib/styles'
import { getDesignRelativeHeight } from '../../../lib/utils/sizes'
import NumPadKeyboard from './NumPadKeyboard'

type AmountInputProps = {
  amount: string,
  handleAmountChange: Function,
  styles: any,
  title?: string,
  error?: string,
  maxLength?: number,
}

const AmountInput = ({ amount, handleAmountChange, styles, error, title, maxLength }: AmountInputProps) => {
  const [caretPosition, setCaretPosition] = useState({ start: 0, end: 0 })

  useEffect(() => {
    const position = amount ? `${amount}`.length : 0
    setCaretPosition({
      start: position,
      end: position,
    })
  }, [])

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {title && <SectionTitle fontWeight="medium">{title}</SectionTitle>}
        <TouchableWithoutFeedback
          onPress={() => (isMobile ? Keyboard.dismiss() : null)}
          accessible={false}
          style={styles.section}
        >
          <InputGoodDollar
            style={error ? styles.errorInput : styles.section}
            editable={!isMobile}
            autoFocus
            amount={amount}
            onChangeAmount={handleAmountChange}
            onSelectionChange={setCaretPosition}
            error={error}
            maxLength={maxLength}
          />
        </TouchableWithoutFeedback>
      </View>
      <NumPadKeyboard
        isMaxLength={maxLength === amount.length}
        amount={amount}
        onPress={handleAmountChange}
        caretPosition={caretPosition}
        updateCaretPosition={setCaretPosition}
      />
    </View>
  )
}

const mapPropsToStyles = ({ theme }) => {
  return {
    wrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      flex: 1,
    },
    section: {
      marginTop: getDesignRelativeHeight(34, false),
    },
    container: {
      minHeight: getDesignRelativeHeight(180),
      height: getDesignRelativeHeight(180),
    },
    errorInput: {
      color: theme.colors.error,
      borderBottomColor: theme.colors.error,
      marginTop: 'auto',
    },
  }
}

export default withStyles(mapPropsToStyles)(AmountInput)
