PGDMP     6                    w            Users    11.3    11.3 
    �
           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            �
           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            �
           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            �
           1262    16393    Users    DATABASE     �   CREATE DATABASE "Users" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Russian_Russia.1251' LC_CTYPE = 'Russian_Russia.1251';
    DROP DATABASE "Users";
             postgres    false            �            1259    16410    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    login character varying,
    pass character varying,
    email character varying,
    rik_or_morti_id character varying,
    img character varying
);
    DROP TABLE public.users;
       public         postgres    false            �            1259    16408    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public       postgres    false    197                        0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
            public       postgres    false    196            ~
           2604    16413    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    197    196    197            �
          0    16410    users 
   TABLE DATA               M   COPY public.users (id, login, pass, email, rik_or_morti_id, img) FROM stdin;
    public       postgres    false    197   Y	                  0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 17, true);
            public       postgres    false    196            �
   �   x���=�0��9L;��N�C�BQ�D�V��TM���j��ݴ��x�$�@Dy�U?���>\@q!����+to��XO[d��L���&v��� �vS��P���EpIFHuJ�w�g7��4Z)�f�C�     