#!/usr/bin/python

from django.conf import settings

def delete_file_in_media(file):
    # TODO https://mkyong.com/python/python-how-to-delete-a-file-or-folder/
    import os

    # getting the folder path from the user
    # file_path = input("Enter folder path:- ")
    file_path = f'{settings.MEDIA_ROOT}/{file}'
    
    # checking whether folder exists or not
    if os.path.exists(file_path):

        # checking whether the folder is empty or not
        if os.path.isfile(file_path):
            # removing the file using the os.remove() method
            os.remove(file_path)
        else:
            # messaging saying folder not empty
            print("This is a folder not a file")
    else:
        # file not found message
        print("File not found in the directory")


def delete_folder_in_media(folder, safe=True):
    # TODO https://mkyong.com/python/python-how-to-delete-a-file-or-folder/
    import os

    # getting the folder path from the user
    # folder_path = input("Enter folder path:- ")
    folder_path = f'{settings.MEDIA_ROOT}/{folder}'

    if safe:
        # checking whether folder exists or not
        if os.path.exists(folder_path):

            # checking whether the folder is empty or not
            if len(os.listdir(folder_path)) == 0:
                # removing the file using the os.remove() method
                os.rmdir(folder_path)
            else:
                # messaging saying folder not empty
                print("Folder is not empty")
        else:
            # file not found message
            print("File not found in the directory")

    else:
        import os
        import sys
        import shutil

        # 3. Deletes a directory and all its contents.
        try:
            shutil.rmtree(folder_path)
        except OSError as e:
            # print("Error: %s - %s." % (e.filename, e.strerror))
            raise e    

