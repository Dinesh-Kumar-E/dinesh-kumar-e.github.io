import json
import os
import markdown
import pytz
from bs4 import BeautifulSoup
from datetime import datetime

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')
TEMPLATE_FILE = os.path.join(BASE_DIR, 'index-dynamic.html')
OUTPUT_FILE = os.path.join(BASE_DIR, 'index.html')

print(f"Compiling {TEMPLATE_FILE}...")

# Load Data
data = {}
if os.path.exists(DATA_DIR):
    for filename in os.listdir(DATA_DIR):
        if filename.endswith('.json'):
            key = filename.replace('.json', '')
            try:
                with open(os.path.join(DATA_DIR, filename), 'r', encoding='utf-8') as f:
                    data[key] = json.load(f)
            except Exception as e:
                print(f"Error loading {filename}: {e}")

# Stats
skill_count = 0
if 'techstack' in data:
    for category in data['techstack']:
        skill_count += len(category.get('skills', []))

project_count = len(data.get('projects', []))
research_count = len(data.get('research', []))
achievement_count = len(data.get('achievements', []))
certification_count = len(data.get('certifications', []))

print("-" * 30)
print("Compilation Stats:")
print(f"Skills: {skill_count}")
print(f"Projects: {project_count}")
print(f"Research Papers: {research_count}")
print(f"Achievements: {achievement_count}")
print(f"Certifications: {certification_count}")
print("-" * 30)

# Load Template
with open(TEMPLATE_FILE, 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f, 'html.parser')

# Helper: Render Markdown
def render_markdown(text):
    if not text:
        return ""
    return markdown.markdown(text)

# --- SECTIONS ---

# 1. Hero
if 'about' in data:
    about = data['about']
    if soup.find(id='hero-name'):
        soup.find(id='hero-name').string = about.get('name', '')
    if soup.find(id='hero-tagline'):
        soup.find(id='hero-tagline').string = about.get('tagline', '')
    
    hero_email_span = soup.find(id='hero-email')
    # Note: In index-dynamic.html, it might be inside a container. 
    # We look for the element with id="hero-email"
    if hero_email_span and about.get('email'):
        hero_email_span.clear()
        a_tag = soup.new_tag('a', href=f"mailto:{about['email']}")
        a_tag['class'] = 'hero-email-link'
        a_tag.string = about['email']
        hero_email_span.append(a_tag)

# 2. About
if 'about' in data:
    about = data['about']
    if soup.find(id='profile-photo'):
        soup.find(id='profile-photo')['src'] = about.get('photo', '')
        soup.find(id='profile-photo')['alt'] = f"{about.get('name', '')} Profile Photo"
    
    if soup.find(id='bio-text'):
        soup.find(id='bio-text').string = about.get('bio', '')
    
    social_container = soup.find(id='social-links')
    if social_container and about.get('socials'):
        social_container.clear()
        icon_map = {
            'github': 'fa-brands fa-github',
            'linkedin': 'fa-brands fa-linkedin',
            'twitter': 'fa-brands fa-x-twitter'
        }
        not_to_display = ["discord", "instagram"]
        
        for platform, url in about['socials'].items():
            if url and platform not in not_to_display:
                a = soup.new_tag('a', href=url, target='_blank', rel='noopener noreferrer')
                a['class'] = 'social-link'
                
                if platform in icon_map:
                    i = soup.new_tag('i')
                    i['class'] = icon_map[platform]
                    a.append(i)
                    
                    span = soup.new_tag('span')
                    span.string = platform.capitalize() if platform != 'github' else 'Github'
                    a.append(span)
                else:
                    a.string = platform.capitalize()
                
                social_container.append(a)

# 3. Tech Stack
if 'techstack' in data:
    container = soup.find(id='techstack-content')
    if container:
        container.clear()
        for category in data['techstack']:
            cat_div = soup.new_tag('div', attrs={'class': 'tech-category'})
            
            h3 = soup.new_tag('h3')
            h3.string = category['category']
            cat_div.append(h3)
            
            skills_div = soup.new_tag('div', attrs={'class': 'tech-skills'})
            for skill in category['skills']:
                span = soup.new_tag('span', attrs={'class': 'tech-skill'})
                span.string = skill
                skills_div.append(span)
            
            cat_div.append(skills_div)
            container.append(cat_div)

# 4. Projects
if 'projects' in data:
    container = soup.find(id='projects-content')
    if container:
        container.clear()
        for project in data['projects']:
            card = soup.new_tag('div', attrs={'class': 'card', 'id': project['id']})
            
            copy_btn = soup.new_tag('button', attrs={'class': 'copy-link', 'title': 'Copy link'})
            copy_btn.append(BeautifulSoup('<i class="material-symbols-outlined">link</i>', 'html.parser'))
            card.append(copy_btn)
            
            h3 = soup.new_tag('h3')
            h3.string = project['title']
            card.append(h3)
            
            tech_div = soup.new_tag('div', attrs={'class': 'card-tech'})
            for tech in project['tech']:
                span = soup.new_tag('span', attrs={'class': 'tech-tag'})
                span.string = tech
                tech_div.append(span)
            card.append(tech_div)
            
            summary_div = soup.new_tag('div', attrs={'class': 'card-summary'})
            summary_div.append(BeautifulSoup(render_markdown(project['summary']), 'html.parser'))
            card.append(summary_div)
            
            links_div = soup.new_tag('div', attrs={'class': 'card-links'})
            if 'links' in project:
                for platform, url in project['links'].items():
                    a = soup.new_tag('a', href=url, target='_blank', rel='noopener noreferrer')
                    a.string = platform.capitalize()
                    links_div.append(a)
            
            if 'detail' in project:
                btn = soup.new_tag('button', attrs={'class': 'expand-btn'})
                btn.string = 'Show Details'
                links_div.append(btn)

                # Embed detail content
                detail_path = os.path.join(BASE_DIR, project['detail'])
                if os.path.exists(detail_path):
                    try:
                        with open(detail_path, 'r', encoding='utf-8') as f:
                            md_content = f.read()
                        html_content = render_markdown(md_content)
                        detail_div = soup.new_tag('div', attrs={'class': 'detail-content', 'style': 'display:none'})
                        detail_div.append(BeautifulSoup(html_content, 'html.parser'))
                        card.append(detail_div)
                    except Exception as e:
                        print(f"Error embedding project detail {project['detail']}: {e}")
            
            card.append(links_div)
            container.append(card)

# 5. Research
if 'research' in data:
    container = soup.find(id='research-content')
    if container:
        container.clear()
        # Google Scholar Link
        if 'about' in data and 'googleScholar' in data['about']:
            scholar_link = soup.find(id='google-scholar-link')
            if scholar_link:
                scholar_link['href'] = data['about']['googleScholar']

        for item in data['research']:
            card = soup.new_tag('div', attrs={'class': 'card', 'id': item['id']})
            
            copy_btn = soup.new_tag('button', attrs={'class': 'copy-link', 'title': 'Copy link'})
            copy_btn.append(BeautifulSoup('<i class="material-symbols-outlined">link</i>', 'html.parser'))
            card.append(copy_btn)
            
            h3 = soup.new_tag('h3')
            h3.string = item['title']
            card.append(h3)
            
            meta = soup.new_tag('div', attrs={'class': 'card-meta'})
            meta.string = f"{item['publisher']} • {item['year']}"
            card.append(meta)
            
            summary = soup.new_tag('div', attrs={'class': 'card-summary'})
            summary.append(BeautifulSoup(render_markdown(item['summary']), 'html.parser'))
            card.append(summary)
            
            links_div = soup.new_tag('div', attrs={'class': 'card-links'})
            if 'doi' in item:
                a = soup.new_tag('a', href=f"https://doi.org/{item['doi']}", target='_blank', rel='noopener noreferrer')
                a.string = 'DOI'
                links_div.append(a)
            if 'link' in item:
                a = soup.new_tag('a', href=item['link'], target='_blank', rel='noopener noreferrer')
                a.string = 'Paper'
                links_div.append(a)
            
            card.append(links_div)
            container.append(card)

# 6. Achievements
if 'achievements' in data:
    container = soup.find(id='achievements-content')
    if container:
        container.clear()
        for item in data['achievements']:
            card = soup.new_tag('div', attrs={'class': 'card', 'id': item['id']})
            
            copy_btn = soup.new_tag('button', attrs={'class': 'copy-link', 'title': 'Copy link'})
            copy_btn.append(BeautifulSoup('<i class="material-symbols-outlined">link</i>', 'html.parser'))
            card.append(copy_btn)
            
            h3 = soup.new_tag('h3')
            h3.string = item['title']
            card.append(h3)
            
            meta = soup.new_tag('div', attrs={'class': 'card-meta'})
            # Try to format date
            date_str = item['date']
            try:
                # Assuming YYYY-MM-DD
                date_obj = datetime.strptime(date_str, '%Y-%m-%d')
                # JS toLocaleDateString depends on locale, we'll use a standard format like MM/DD/YYYY or similar
                date_str = date_obj.strftime('%m/%d/%Y')
            except:
                pass
            meta.string = date_str
            card.append(meta)
            
            summary = soup.new_tag('div', attrs={'class': 'card-summary'})
            summary.append(BeautifulSoup(render_markdown(item['summary']), 'html.parser'))
            card.append(summary)
            
            links_div = soup.new_tag('div', attrs={'class': 'card-links'})
            if 'link' in item:
                a = soup.new_tag('a', href=item['link'], target='_blank', rel='noopener noreferrer')
                a.string = 'View'
                links_div.append(a)
            if 'detail' in item:
                btn = soup.new_tag('button', attrs={'class': 'expand-btn'})
                btn.string = 'Show Details'
                links_div.append(btn)

                # Embed detail content
                detail_path = os.path.join(BASE_DIR, item['detail'])
                if os.path.exists(detail_path):
                    try:
                        with open(detail_path, 'r', encoding='utf-8') as f:
                            md_content = f.read()
                        html_content = render_markdown(md_content)
                        detail_div = soup.new_tag('div', attrs={'class': 'detail-content', 'style': 'display:none'})
                        detail_div.append(BeautifulSoup(html_content, 'html.parser'))
                        card.append(detail_div)
                    except Exception as e:
                        print(f"Error embedding achievement detail {item['detail']}: {e}")
            
            card.append(links_div)
            container.append(card)

# 7. Experience
if 'experience' in data:
    container = soup.find(id='experience-content')
    if container:
        container.clear()
        for item in data['experience']:
            div = soup.new_tag('div', attrs={'class': 'timeline-item'})
            
            h3 = soup.new_tag('h3')
            h3.string = item['role']
            div.append(h3)
            
            meta = soup.new_tag('div', attrs={'class': 'timeline-meta'})
            meta.string = f"{item['company']} • {item['duration']}"
            div.append(meta)
            
            desc = soup.new_tag('div', attrs={'class': 'timeline-description'})
            desc.string = item['description']
            div.append(desc)
            
            container.append(div)

# 8. Certifications
if 'certifications' in data:
    container = soup.find(id='certifications-content')
    if container:
        container.clear()
        for item in data['certifications']:
            card = soup.new_tag('div', attrs={'class': 'card', 'id': item['id']})
            
            copy_btn = soup.new_tag('button', attrs={'class': 'copy-link', 'title': 'Copy link'})
            copy_btn.append(BeautifulSoup('<i class="material-symbols-outlined">link</i>', 'html.parser'))
            card.append(copy_btn)
            
            h3 = soup.new_tag('h3')
            h3.string = item['title']
            card.append(h3)
            
            meta = soup.new_tag('div', attrs={'class': 'card-meta'})
            meta.string = f"{item['issuer']} • {item['date']}"
            card.append(meta)
            
            links_div = soup.new_tag('div', attrs={'class': 'card-links'})
            if 'link' in item:
                a = soup.new_tag('a', href=item['link'], target='_blank', rel='noopener noreferrer')
                a.string = 'View Certificate'
                links_div.append(a)
            
            card.append(links_div)
            container.append(card)

# 9. Profiles
if 'about' in data and 'codingProfiles' in data['about']:
    container = soup.find(id='profiles-content')
    if container:
        container.clear()
        profiles_map = [
            {'name': 'LeetCode', 'key': 'leetcode'},
            {'name': 'Codeforces', 'key': 'codeforces'},
            {'name': 'CodeChef', 'key': 'codechef'}
        ]
        for profile in profiles_map:
            url = data['about']['codingProfiles'].get(profile['key'])
            if url:
                card = soup.new_tag('div', attrs={'class': 'profile-card'})
                
                h3 = soup.new_tag('h3')
                h3.string = profile['name']
                card.append(h3)
                
                a = soup.new_tag('a', href=url, target='_blank', rel='noopener noreferrer')
                a.string = 'View Profile'
                card.append(a)
                
                container.append(card)

# 10. Education
if 'education' in data:
    container = soup.find(id='education-content')
    if container:
        container.clear()
        for item in data['education']:
            div = soup.new_tag('div', attrs={'class': 'timeline-item'})
            
            h3 = soup.new_tag('h3')
            h3.string = item['degree']
            div.append(h3)
            
            meta = soup.new_tag('div', attrs={'class': 'timeline-meta'})
            meta.string = f"{item['institution']} • {item['year']}"
            div.append(meta)
            
            grade = soup.new_tag('div', attrs={'class': 'timeline-description'})
            grade.string = f"Grade: {item['grade']}"
            div.append(grade)
            
            container.append(div)

# 11. Contact
if 'about' in data:
    about = data['about']
    email_el = soup.find(id='contact-email')
    if email_el and about.get('email'):
        email_el.clear()
        a = soup.new_tag('a', href=f"mailto:{about['email']}", attrs={'class': 'email-link'})
        a.string = about['email']
        email_el.append(a)
    
    social_container = soup.find(id='contact-social')
    if social_container and about.get('socials'):
        social_container.clear()
        icon_map = {
            'github': 'fa-brands fa-github',
            'linkedin': 'fa-brands fa-linkedin',
            'twitter': 'fa-brands fa-x-twitter',
            'instagram': 'fa-brands fa-instagram',
            'discord': 'fa-brands fa-discord'
        }
        for platform, url in about['socials'].items():
            if url and platform in icon_map:
                a = soup.new_tag('a', href=url, target='_blank', rel='noopener noreferrer', attrs={'class': 'contact-social-link'})
                
                i = soup.new_tag('i', attrs={'class': icon_map[platform]})
                a.append(i)
                
                span = soup.new_tag('span')
                span.string = platform.capitalize() if platform != 'github' else 'Github'
                a.append(span)
                
                social_container.append(a)

# 12. Footer
if 'about' in data:
    if soup.find(id='footer-name'):
        soup.find(id='footer-name').string = data['about'].get('name', '')
    
    if 'socials' in data['about']:
        socials = data['about']['socials']
        social_links = {
            'github-link': socials.get('github'),
            'linkedin-link': socials.get('linkedin'),
            'twitter-link': socials.get('twitter'),
            'instagram-link': socials.get('instagram'),
            'discord-link': socials.get('discord')
        }
        for id_val, url in social_links.items():
            el = soup.find(id=id_val)
            if el and url:
                el['href'] = url
    
    # Add Last Updated
    footer_content = soup.find('div', class_='footer-content')
    if footer_content:
        # Find the copyright p tag
        copyright_p = footer_content.find('p')
        
        # Create timestamp
        ist = pytz.timezone('Asia/Kolkata')
        now = datetime.now(ist)
        # Format: Last Update on 28/11/2025 11:41 pm IST
        timestamp_str = now.strftime("Last Update on %d/%m/%Y %I:%M %p IST")
        
        # Create new p tag
        update_p = soup.new_tag('p')
        update_p.string = timestamp_str
        
        if copyright_p:
            copyright_p.insert_after(update_p)
        else:
            footer_content.insert(0, update_p)

# 13. Toggle Skeleton Classes
skeleton_ids = [
    'hero-skeleton', 'about-skeleton', 'techstack-skeleton', 
    'projects-skeleton', 'research-skeleton', 'achievements-skeleton',
    'experience-skeleton', 'certifications-skeleton', 'profiles-skeleton',
    'education-skeleton'
]

content_ids = [
    'hero-content', 'about-content', 'techstack-content',
    'projects-content', 'research-content', 'achievements-content',
    'experience-content', 'certifications-content', 'profiles-content',
    'education-content', 'projects-pagination', 'research-pagination',
    'achievements-pagination', 'certifications-pagination', 'google-scholar-link'
]

for sk_id in skeleton_ids:
    el = soup.find(id=sk_id)
    if el:
        # Add skeleton-hidden
        classes = el.get('class', [])
        if 'skeleton-hidden' not in classes:
            classes.append('skeleton-hidden')
            el['class'] = classes

for ct_id in content_ids:
    el = soup.find(id=ct_id)
    if el:
        # Remove skeleton-hidden
        classes = el.get('class', [])
        if 'skeleton-hidden' in classes:
            classes.remove('skeleton-hidden')
            el['class'] = classes

# Save
with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
    f.write(str(soup.prettify()))

print(f"Successfully compiled {TEMPLATE_FILE} to {OUTPUT_FILE}")
