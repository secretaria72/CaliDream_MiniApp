import os
import re

# Chemins relatifs
fiche_dir = 'fiche'
img_produits_dir = os.path.join('img', 'produits')
vid_videos_dir = os.path.join('vid', 'videos')

# Liste fichiers médias
images = set(os.listdir(img_produits_dir))
videos = set(os.listdir(vid_videos_dir))

print(f"Images trouvées ({len(images)}): {sorted(images)}")
print(f"Vidéos trouvées ({len(videos)}): {sorted(videos)}")

# Regex pour extraire chemins src et poster dans HTML
img_pattern = re.compile(r'poster="([^"]+)"')
video_pattern = re.compile(r'src="([^"]+)"')

# Analyse des fiches
errors = []

for fiche_file in os.listdir(fiche_dir):
    if fiche_file.endswith('.html'):
        fiche_path = os.path.join(fiche_dir, fiche_file)
        with open(fiche_path, 'r', encoding='utf-8') as f:
            content = f.read()

        imgs = img_pattern.findall(content)
        vids = video_pattern.findall(content)

        for img_path in imgs:
            img_name = os.path.basename(img_path)
            if img_name not in images:
                errors.append(f"Image manquante dans {fiche_file}: {img_name}")

        for vid_path in vids:
            vid_name = os.path.basename(vid_path)
            if vid_name not in videos:
                errors.append(f"Vidéo manquante dans {fiche_file}: {vid_name}")

if errors:
    print("\nErreurs détectées :")
    for err in errors:
        print(" -", err)
else:
    print("\nTous les fichiers médias référencés existent correctement !")
