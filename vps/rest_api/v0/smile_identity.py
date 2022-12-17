
# TODO https://docs.smileidentity.com/server-to-server/python/generate-sec-key#generating-a-signature
# from smile_id_core import Signature

# Initialize
# partner_id = "<Put your partner ID here>" # login to the Smile Identity portal to view your partner id
# api_key = "<Put your API key here>" # copy your API key from the Smile Identity portal

# signature = Signature(partner_id, api_key)

# Generate a signature
# signature_dict = signature.generate_signature("<put your custom timestamp>")  # where timestamp is optional

# TODO https://docs.smileidentity.com/server-to-server/python/generate-sec-key#confirming-an-incoming-signature
# from smile_id_core import Signature

# Initialize
# partner_id = "<Put your partner ID here>"; # login to the Smile Identity portal to view your partner id
# api_key = "<Put your API key here>"; # copy your API key from the Smile Identity portal

# signature = Signature(partner_id, api_key)

# Confirm a signature
# signature_dict = signature.confirm_signature("<put the received timestamp>","<put the received signature>")

# TODO https://docs.smileidentity.com/server-to-server/python/products/enhanced-kyc#submit-the-job-to-smile-identity
from smile_id_core import IdApi, ServerError

# Initialize Values
# partner_id = "<Your partner ID>"; # login to the Smile Identity portal to view your partner id
# api_key = "<Your API key>"; # copy your API key from the Smile Identity portal
# sid_server = <0 or 1>; # Use 0 for the sandbox server, use 1 for production server

partner_id = "2180"
api_key = "70818e44-79fb-4f76-8d8d-7c8a7226427e"
sid_server = 1

connection = IdApi(partner_id, api_key, sid_server)

def enhanced_kyc(id_number, id_type, country="KE"):
    # Create required tracking parameters
    # partner_params = {
    #     "user_id": "<put your unique ID for the user here>",
    #     "job_id": "<put your unique job ID here>",
    #     "job_type": 5,
    # }
    partner_params = {
        "user_id": "<put your unique ID for the user here>",
        "job_id": "<put your unique job ID here>",
        "job_type": 5,
    }

    # Create ID info
    # id_info_params = {
    # "first_name": "<first name>",
    # "last_name": "<surname>",
    # "country": "<2-letter country code>",
    # "id_type": "<id type>",
    # "id_number": "<valid id number>",
    # "dob": "<date of birth>", # yyyy-mm-dd
    # "phone_number": "<phone number>" 
    # }
    id_info_params = {
    "country": country,
    "id_type": id_type,
    "id_number": id_number,
    }

    # Set the options for the job
    option_params = {
        "signature": True
    }

    # Submit the Job
    try:
        response = connection.submit_job(partner_params, id_info_params, options_params=option_params)
        return response
    except ValueError:
        # some of your params entered for a job are not valid or missing
        print("handle ValueError")
        raise ValueError
    except ServerError:
        # Server returned an error
        print("handle ServerError")
        raise ValueError

if __name__ == '__main__':
    # Execute when the module is not initialized from an import statement.
    response = enhanced_kyc(id_number="26034567", id_type="NATIONAL_ID", country="UG")
    print(response)
    print(response.json())