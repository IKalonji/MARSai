def validate_transaction_data(transaction):
    """
    Function for validating transaction data.
    
    Args:
        transaction (dict): A dictionary representing a transaction.

    Returns:
        bool: True if the transaction data is valid, False otherwise.
    """
    if not isinstance(transaction, dict):
        return False

    # required_keys = ["transactionType", "crypto", "amount", "date"] 
    # if not all(key in transaction for key in required_keys):
    #     return False
    return True