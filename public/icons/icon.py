import mysql.connector
import requests
import os

def download_image(image_url, filename):
    response = requests.get(image_url, stream=True)
    if response.status_code == 200:
        with open(filename, 'wb') as file:
            for chunk in response.iter_content(1024):
                file.write(chunk)

def main():
    # Database connection
    db_config = {
        'host': '95.179.140.85',
        'user': 'root',
        'password': '2023Hamburg+12',
        'database': 'player'
    }
    db = mysql.connector.connect(**db_config)
    cursor = db.cursor()

    # Fetch vnums from the database
    cursor.execute("""
        SELECT vnum
        FROM player.item_proto
        WHERE gold = 0 AND type IN (3, 16, 18, 21, 28);
    """)
    vnums = cursor.fetchall()

    # Download images
    for (vnum,) in vnums:
        image_url = f'https://img.m2icondb.com/{str(vnum).zfill(5)}.png'
        filename = os.path.join(os.path.dirname(__file__), f'{str(vnum).zfill(5)}.png')
        download_image(image_url, filename)
        print(f'Downloaded {filename}')

    cursor.close()
    db.close()

if __name__ == '__main__':
    main()
